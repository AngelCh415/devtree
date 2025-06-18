import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";

export default function LinkTreeView() {
    const [devTreeLinks, setDevTreeLinks] = useState(social);

    const handelUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        console.log(e.target.name);

    }
    return (
            <div className="space-y-5">
                {devTreeLinks.map(item => (
                    <DevTreeInput
                        key={item.name}
                        item={item}
                        handelUrlChange={handelUrlChange}
                    />
                ))}

            </div>
    );
};
