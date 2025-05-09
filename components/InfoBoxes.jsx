import InfoBox from "./InfoBox";

const infoBoxData = [
  {
    title:'租客',
    content: '浏览房源信息，寻找心仪的住房',
    bottonBg: 'bg-black',
    bg:'bg-slate-200',
    buttonText: '浏览房源',
    href:'/properties',
  },
  {
    title:'房东',
    content: '发布房源，发现租客',
    bottonBg: 'bg-blue-400',
    bg:'bg-blue-100',
    buttonText: '发布房源',
    href:'/properties/add',
  }
]
export default function InfoBoxes() {
  return (
    <div className='flex justify-center'>
      {
        infoBoxData.map((item, index) => (
         <InfoBox key={index} title={item.title}
         content={item.content} buttonBg={item.bottonBg}
         bg={item.bg} buttonText={item.buttonText} href={item.href}></InfoBox>
        ))
      }
    </div>
  )
}