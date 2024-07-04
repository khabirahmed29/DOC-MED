import React from "react";

import { locations, quickLinks, contactinfo, social } from "../constants";

const Footer = ()=>{
    return (
        <section className="footer">
            {/* <hr style={{
                background: 'black',
                color: 'black',
                borderColor: 'black',
                height: '3px',
                }}
            /> */}
            <div className="box-container">
                <div className="box">
                    <h3>Locations</h3>
                    {locations.map((point, index)=>(
                        <a href="">{point.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>quick links</h3>
                    {quickLinks.map((links, index)=>(
                        <a href="">{links.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>Contact info</h3>
                    {contactinfo.map((Contact, index)=>(
                        <a href="">{Contact.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>Follow Us</h3>
                    {social.map((link, index)=>(
                        <a href={link.link}>{link.place}</a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Footer;