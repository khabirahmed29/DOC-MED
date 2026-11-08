import React from "react";

import { locations, quickLinks, contactinfo, social } from "../constants";
import { Separator } from "./ui/separator";

const Footer = ()=>{
    return (
        <section className="footer app-footer">
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
                    <Separator className="app-footer-separator" />
                    {locations.map((point, index)=>(
                        <a href="">{point.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>quick links</h3>
                    <Separator className="app-footer-separator" />
                    {quickLinks.map((links, index)=>(
                        <a href="">{links.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>Contact info</h3>
                    <Separator className="app-footer-separator" />
                    {contactinfo.map((Contact, index)=>(
                        <a href="">{Contact.place}</a>
                    ))}
                </div>
                <div className="box">
                    <h3>Follow Us</h3>
                    <Separator className="app-footer-separator" />
                    {social.map((link, index)=>(
                        <a href={link.link}>{link.place}</a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Footer;
