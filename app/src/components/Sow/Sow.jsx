// TODO: Remove from production, for prototype only 
import React from "react";
import { Link } from "react-router-dom";

import classes from "./Sow.module.scss";

import GlasswallLogo from "../GlasswallLogo/GlasswallLogo";
import Button from "../UI/Button/Button";


const requirementsData = [
    {
        sectionId: "3.2",
        title: "Management UI",
        description: "Requirements pertaining to the delivery of UI features"
    },
    {
        sectionId: "3.2.1",
        title: "Performance Display",
        description: "UI shall display statistics concerning the operating status of the GW Engine to include file processing performance, processing rates, priority findings, trend analysis and other information as determined by the Enhancement 4 Technical Exchange Meeting and subsequently documented in the Enhancement 4 Design Document."
    },
    {
        sectionId: "3.2.2",
        title: "Policy Management",
        description: "UI shall allow administrative users to configure and update ICAP proxy file inspection. This feature shall also allow users to see which policies were applied to non- compliant files."
    },
    {
        sectionId: "3.2.3",
        title: "Non-compliant File Routing",
        description: "UI shall include a file routing feature that allows users to route files that do not comply with stated management policies for passage onto separate file systems. Specified file systems and routing mechanism(s) will be determined at the Enhancement 4 Technical Exchange Meeting and subsequently documented in the Enhancement 4 Design Document."
    },
    {
        sectionId: "3.2.4",
        title: "Risk and File Extension-based Views",
        description: "UI shall allow administrative users to view and filter file’s processing results based on risk level and detected file extension."
    },
    {
        sectionId: "3.2.5",
        title: "File Drop Service*",
        description: "UI shall allow administrative and non-administrative users to upload supported file types via browser for GW Engine inspection and subsequent report generation of priority findings. Reports shall be delivered to users through the UI and minimally allow for XML and PDF export. Report content will be determined at the Enhancement 4 Technical Exchange Meeting and subsequently documented in the Enhancement 4 Design Document."
    }    
]


const Sow = ({ onLoginHandler }) => {

    const requirementsTableRows = requirementsData.map(row => {
        return (
            <tr key={row.sectionId}>
                <td>{row.sectionId}</td>
                <td>{row.title}</td>
                <td>{row.description}</td>
            </tr>
        )
    })

    return (
        <section>
            <GlasswallLogo className={classes.logo} />
            <div className={classes.wrapForm}>
                <h2 className={classes.heading}>
                    Requirements from the SOW Document
				    </h2>
                <p className={classes.message}>
                    The abridged requirements document can be
					    found <a
                        href="https://github.com/filetrust/program-icap/wiki/Abridged-Amendment-3"
                        target="_blank"
                        rel="noopener noreferrer">here.</a>
                </p>

                <form>
                    <div className={classes.wrapButtons}>
                        <Link to={"/"}>
                            <Button onButtonClick={onLoginHandler}>Back</Button>
                        </Link>
                    </div>
                </form>

                <table className={classes.requirementsTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirementsTableRows}
                    </tbody>
                </table>

                
            </div>
        </section>
    );
};

export default Sow;