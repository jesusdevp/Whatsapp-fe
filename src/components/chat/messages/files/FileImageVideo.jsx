

export const FileImageVideo = ({ url, type }) => {

    const handleViewImg = () => {
        window.open(url)
    }
    
  return (
    <div className="z-20">
      {type === "IMAGE" ? (
        <img src={url} alt="" className="cursor-pointer" onClick={() => handleViewImg()} />
      ) : (
        <video src={url} controls className="cursor-pointer"></video>
      )}
    </div>
  )
}
