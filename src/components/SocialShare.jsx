import { faFacebook, faGooglePlusG, faPinterest, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SocialShare() {
    return (
        <div className="sbuttons">
            <a href="#" target="_blank" className="sbutton whatsapp" tooltip="WhatsApp"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="#" target="_blank" className="sbutton fb" tooltip="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#" target="_blank" className="sbutton gplus" tooltip="Google Plus"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            <a href="#" target="_blank" className="sbutton twitt" tooltip="Twitter"><FontAwesomeIcon icon={faXTwitter} /></a>
            <a href="#" target="_blank" className="sbutton pinteres" tooltip="Pinterest"><FontAwesomeIcon icon={faPinterest} /></a>
            <a target="_blank" className="sbutton mainsbutton" tooltip="Share"><FontAwesomeIcon icon={faShare} /></a>
        </div>
    )
}

export default SocialShare