import SNBChannel from "./SNBChannel";

const SNBChannelGroupList=()=>{
    return(
        <>
        <li><SNBChannel channelType={"text"}></SNBChannel></li>
        <li><SNBChannel channelType={"voice"}></SNBChannel></li>
        </>
    )
}
export default SNBChannelGroupList;