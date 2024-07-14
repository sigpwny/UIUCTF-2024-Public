for i in $(seq 3000); do
    echo $i, 3000
    openssl prime -generate -bits 1024 -checks 40 >> primes.txt
done
