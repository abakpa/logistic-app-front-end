import homeImage from '../image/dispatch landing page.jpeg'
const HomePage =() =>{

      
return(
    <div className="flex items-center justify-center h-screen bg-gray-100">
    {/* The image container */}
    <div className="text-center">
      <img 
        src={homeImage} 
        alt="dispatch rider" 
        className="mx-auto"
      />
      {/* <p className="mt-4 text-lg">Welcome to the Home Page</p> */}
    </div>
  </div>
)
}
export default HomePage