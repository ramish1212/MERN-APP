import React from 'react'
import { faFacebook, faPinterest, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function DownloadCard({ videoData, downloadLink, handleDownload, loading, mediaType }) {

    console.log(videoData);
    const thumbnail_url = videoData?.thumbnails?.length > 0
        ? videoData.thumbnails[videoData.thumbnails.length - 1]?.url
        : '';
    return (
        <div className="Downloadcard">
            <div className="image">
                <img src={thumbnail_url} alt="" />
            </div>
            <div className="videoDetails">
                <button className='btn-round'>{`${mediaType === "video" ? "Video" : "Audio"}`}</button>
                <h1>{videoData.title}</h1>
                <p>URL: {videoData.video_url}</p>
                {!downloadLink ? 
                <button className='btn-simple'
                onClick={handleDownload}
                disabled={loading}
                >
                    {loading
                        ? "Downloading..."
                        : `Download ${mediaType === "video" ? "Video" : "Audio"}`}
                </button>
                        : ""}
                <div className="share-div">
                    <span>Share:</span>
                    <a href="#" target="_blank" ><FontAwesomeIcon icon={faWhatsapp} /></a>
                    <a href="#" target="_blank" ><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
                    <a href="#" target="_blank"><FontAwesomeIcon icon={faPinterest} /></a>
                </div>
                {downloadLink && (
                    <div className='downloadlink-div'>
                        <a href={downloadLink} download="file">
                            Click here to download your {`${mediaType === "video" ? "Video" : "Audio"}`}
                        </a>
                    </div>)}
            </div>
        </div>
    )
}

export default DownloadCard