export default function Personalize({ background, masks, texts }) {
  return (
    <div>
      hello {masks.length} {texts.length} {background.width} {background.height}
    </div>
  )
}
