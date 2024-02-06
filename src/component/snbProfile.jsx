import './SNBProfile.css'

const SNBProfile=()=>{
    return(
        <div className='SnbProfile'>
                 <div className="avatarWrapper">
                     <img src="https://cdn-icons-png.flaticon.com/128/1281/1281188.png" alt="profileImage" id="profileImage"/>
                     <div className="profileName">
                         <p id="nickname">nickname</p>
                         <p id='accountName'>accountName</p>
                     </div>
                 </div>
                 <div className="settingWrapper">
                    <button>
                        <img src="https://cdn-icons-png.flaticon.com/128/11386/11386370.png" alt="" id />
                    </button>
                     <button>
                        <img src="https://cdn-icons-png.flaticon.com/128/78/78447.png" alt="" />
                     </button>
                     <button>
                         <img src="https://cdn-icons-png.flaticon.com/128/148/148913.png" alt="" />
                     </button>
                 </div>
        </div>
    )
}
export default SNBProfile;
