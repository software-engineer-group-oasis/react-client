import InfoBox from "./InfoBox";

const infoBoxData = [
  {
    title:'For Renters',
    content: 'Find your dream rental property. Bookmark properties and contact owners',
    bottonBg: 'bg-black',
    bg:'bg-slate-200',
    buttonText: 'Browse Properties',
    href:'/properties',
  },
  {
    title:'For Property Owners',
    content: 'List your properties and reach potentials. Rent as an airbnb or long term',
    bottonBg: 'bg-blue-400',
    bg:'bg-blue-100',
    buttonText: 'Add Property',
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