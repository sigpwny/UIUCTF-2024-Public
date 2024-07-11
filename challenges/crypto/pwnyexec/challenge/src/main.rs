// https://www.willsroot.io/2020/06/redpwnctf-2020-rust-pwn-writeups.html
#![allow(dead_code)]
#![allow(unused_imports)]
#![allow(unused_variables)]
#![allow(while_true)]
extern crate aes;
extern crate cbc;
extern crate libc;
extern crate regex;
use base64::{engine::general_purpose, Engine as _};
use hex_literal::hex;
use libc::{mmap, mprotect, munmap, MAP_ANON, MAP_PRIVATE, PROT_EXEC, PROT_READ, PROT_WRITE};
use std::fs::File;
use std::io;
use std::io::Error;
use std::io::Read;
use std::io::Write;
use std::process;
use std::ptr::copy_nonoverlapping;
use regex::Regex;

use aes::cipher::{block_padding::Pkcs7, BlockDecryptMut, BlockEncryptMut, KeyIvInit};
type Aes128CbcEnc = cbc::Encryptor<aes::Aes128>;
type Aes128CbcDec = cbc::Decryptor<aes::Aes128>;

static KEY: [u8; 16] = hex!("42694269426942694269426942694269");

// let's just do exactly the same thing, except assembly instead

fn menu() {
    println!("1. Print source");
    println!("2. Decrypt: b64decode(decrypt(yourcode)))");
    println!("3. Execute: exec(b64decode(decrypt(yourcode)))");
    println!("4. Exit");
}

fn print_source() -> Result<(), Error> {
    let mut file = File::open("src/main.rs")?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    let re = Regex::new(r"static KEY:.*").unwrap();
    let result = re.replace_all(&content, "static KEY: [u18; 16] = hex!(\"000000000000000000000000\");");
    println!("{}", result);
    Ok(())
}

fn decrypt(ciphertext: Vec<u8>, key: [u8; 16]) -> Vec<u8> {
    // retval either [u8;16], error, or reference to input buf?
    let iv = [0u8; 16];
    let mut buf: Vec<u8> = ciphertext.clone();
    let plaintext: &[u8] = Aes128CbcDec::new(&key.into(), &iv.into())
        .decrypt_padded_mut::<Pkcs7>(&mut buf)
        .unwrap();
    // dbg!(plaintext);

    plaintext.to_vec()
}

fn decryption_ui() -> Result<(),Error> {
    // take bytes on stdin, attempt decrypt, print hex repr to stdout
    let mut buf1 = String::new();
    std::io::stdin().read_line(&mut buf1).expect("Failed to read from stdin");
    buf1 = buf1.trim_end().to_string();
    let s: String = decrypt(debase64(&buf1).clone(), KEY).iter().map(|x| format!("{:02x}", x)).collect();
    println!("{}", s);
    Ok(())
}

fn debase64(buf: &String) -> Vec<u8> {
    general_purpose::STANDARD.decode(buf).unwrap()
}

fn execute() -> Result<(), Error> {
    // stdin_read base64(aes(some x86 bytecode))
    let mut buffer = String::new();
    // dbg!("attempting to read stdin");
    std::io::stdin()
        .read_line(&mut buffer)
        .expect("Failed to read from stdin");
    buffer = buffer.trim_end().to_string();
    // dbg!(&buffer);

    // de-base64
    let buf2: Vec<u8> = debase64(&buffer);

    // dbg!(&buf2);
    // dbg!(&buf2.len());

    // decrypt
    let buf3 = decrypt(buf2.clone(), KEY);

    // dbg!(&buf3);

    // Map memory of the size of the buffer as writable.
    let ptr = unsafe {
        mmap(
            std::ptr::null_mut(),
            buf3.len(),
            PROT_READ | PROT_WRITE,
            MAP_PRIVATE | MAP_ANON,
            -1,
            0,
        )
    };

    if ptr == libc::MAP_FAILED {
        panic!("Failed to map memory");
    }

    // Copy the buffer into the mapped memory.
    unsafe {
        copy_nonoverlapping(buf3.as_ptr(), ptr as *mut u8, buf3.len());
    }

    // Make the memory executable.
    if unsafe { mprotect(ptr, buf3.len(), PROT_READ | PROT_EXEC) } != 0 {
        unsafe {
            munmap(ptr, buf3.len());
        }
        panic!("Failed to set memory as executable");
    }

    // Cast the pointer to a function and call it.
    let func: extern "C" fn() -> u64 = unsafe { std::mem::transmute(ptr) };

    let retval: u64 = func();
    // dbg!(&retval);

    if retval == 0x45 {
        let mut file = File::open("flag.txt")?; // TODO better error handling
        let mut content = String::new();
        file.read_to_string(&mut content)?;
        println!("{}", content);
    } else {
        println! {"try again...."};
    }

    // Clean up.
    unsafe {
        munmap(ptr, buf3.len());
    }

    println!("code executed successfully!");

    Ok(())
}

fn prompt() {
    print!("pwnyexec> ");
    io::stdout().flush().unwrap();
}

fn main() {
    println!("Execute anything you want!");
    while true {
        menu();
        prompt();
        let mut choice = String::new();
        io::stdin()
            .read_line(&mut choice)
            .expect("failed to read input.");
        let choice: i32 = choice.trim().parse().expect("invalid input");

        let _res = match choice {
            1 => print_source(),
            2 => decryption_ui(),
            3 => execute(),
            4 => {
                println!("Bye!");
                process::exit(0);
            }
            _ => Ok({
                println!("Invalid choice!");
            }),
        };
    }
}

// next: AES crate, decrypt input that is read in -- done!
// next: AES weakness (decrypt): should take ciphertext and return plaintext
