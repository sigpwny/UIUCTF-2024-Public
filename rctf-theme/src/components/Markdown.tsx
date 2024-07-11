import snarkdown from "snarkdown";

// From https://github.com/developit/snarkdown/issues/75
const snarkdownEnhanced = (md: string) => {
  const htmls = md
    .split(/(?:\r?\n){2,}/)
    .map(l =>
      [' ', '\t', '#', '-', '*'].some(ch => l.startsWith(ch))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`
    )

  return htmls.join('\n\n')
}

export default function Markdown({ content }: { content: string }) {
  return (
  <span dangerouslySetInnerHTML={{ __html: snarkdownEnhanced(content) }} />
  )
}