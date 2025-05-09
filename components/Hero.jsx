export default function Hero() {
  return (
    <section className='bg-blue-500 p-12 flex flex-col gap-5'>
      <hr style={{
        color:"white"
      }}/>
      {/* heading */}
      <div>
        <h1 className="text-white text-center
        font-bold text-6xl">寻找属于你的港湾</h1>
      </div>
      {/* description */}
      <div>
        <p className="text-white text-center">
        Discover the perfect property that suits your needs</p>
      </div>
      {/* utilites */}
      <div className="flex gap-10 justify-center">
        <div>
          <input type="text" placeholder="城市"
          className="bg-white rounded-sm p-4"
          style={{
             outline:'none',
          }}/>
        </div>
        <div>
          <select name="" id="" className="bg-white rounded-sm p-4 w-48">
            <option value="">全部</option>
          </select>
        </div>
        <div>
          <button className="bg-sky-500 text-white p-4 rounded-sm">搜索</button>
        </div>
        
      </div>
    </section>
  )
}