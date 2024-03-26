import { useNavigate } from "react-router-dom";

export default function Cart({children ,bordercolor="border-error", dividercolor="bg-gray-100",fontcolor="text-white",  background="bg-primary" ,titletext = "Card" , status=50, quantity=50}){
    
  
    const navigate = useNavigate();
    function oncardclick(){
          navigate(`/dashboard?status=${titletext}`);
    }
    
    return(
        <div onClick={oncardclick} className={`hover:scale-110 hover:cursor-pointer transition-all ease-in-out duration-300 border-b-8 ${bordercolor}   w-64 h-44 ${background} flex flex-col justify-center items-center py-2 rounded-md`}>

           <div className='text-primary-content text-2xl '>
                 {children} <span className='font-semibold'>{titletext}</span>
           </div>

            <div className={`divider ${dividercolor} h-0.5 mx-4 rounded-sm`}></div>

            <div className='flex justify-around items-center gap-4'>
                <div className={`text-7xl ${fontcolor}`}>
                  {quantity}
                </div>
                <div className={`radial-progress ${fontcolor}`} style={{"--value":status*100}}>{status*100}%</div>
            </div>

        </div>
    );
}