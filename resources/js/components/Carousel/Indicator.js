import React from "react";
import DotIndicator from "@mui-treasury/components/indicator/dot/DotIndicator";

const Indicator = () => {
    const [index, setIndex] = React.useState(0);
    return (
        <div>
            {[0, 1, 2].map(i => (
                <DotIndicator
                    key={i}
                    active={i === index}
                    onClick={() => setIndex(i)}
                />
            ))}
        </div>
    );
};

export default Indicator;
