import { useEffect, useState } from "react"
import useMultistepForm from "../../utilities/useMultistepForm"
import EFInitialFeelings from "./EFInitialFeelings"
import EFUnderlyingFeelings from "./EFUnderlyingFeelings"
import EFNeeds from "./EFNeeds"
import EFSummary from "./EFSummary"
import { ReactComponent as RightIcon } from '../../assets/icons/angle-right-solid.svg'
import { ReactComponent as LeftIcon } from '../../assets/icons/angle-left-solid.svg'


export default function EmpathyForm(props) {
    const [data, setData] = useState(props.content)
    const [check, setCheck] = useState(false)
    const steps = [];
        if (data['initialFeelings']) {
        steps.push(<EFInitialFeelings {...data} formPage="EFInitialFeelings" updateFields={updateFields} handleDivClick={handleDivClick} />);
        }
        steps.push(
        <EFUnderlyingFeelings {...data} formPage="EFUnderlyingFeelings" updateFields={updateFields} handleDivClick={handleDivClick} />,
        <EFNeeds {...data} formPage="EFNeeds" updateFields={updateFields} handleDivClick={handleDivClick} />,
        <EFSummary {...data} formPage="EFSummary"/>
        );

    const { currentStepIndex, step, isLastStep, back, next } =
        useMultistepForm(steps);


    const formPage = step.props.formPage
    
    
      
    function updateFields(fields) {
        setData(prevData => {
            return {...prevData, ...fields}
        })
    }

    function handleDivClick(section, index,check1) {     
        if (formPage==="EFInitialFeelings") {
            setCheck(check1);  
            
        }
        if (formPage==="EFUnderlyingFeelings"&& "needs") {
            setCheck(false);
            setCheck(check1);  
        }
        if (formPage==="EFNeeds") {
            setCheck(check1);  
        }
       
        setData(prevData => {
            const updatedSection = prevData[section].map((item, i) => {
                if (i === index) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            return { ...prevData, [section]: updatedSection };
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!isLastStep) return next()

    };
    


    return (
            <div className="h-full grid grid-rows-[60px,1fr,80px]">
                {step}
            {formPage !== "EFSummary" && <div className="flex flex-row justify-between items-center text-sm mx-4">
                {currentStepIndex === 0 && <div className=""></div>}
                {currentStepIndex !== 0 &&
                    <button type="button" className="flex flex-row items-center" style={{ color: "#888888" }} onClick={back}><LeftIcon className="mx-2 opacity-40" width={12} />
                        {formPage === "EFUnderlyingFeelings" && "initial feelings"}
                        {formPage === "EFNeeds" && "underlying feelings"}
                    </button>}
                    {check? 
                <button className="flex flex-row items-center" type="button" style={{ color: "#888888" }} onClick={next}  >
                   
                   
                    {formPage === "EFInitialFeelings" && "underlying feelings" }
                    
                    {formPage === "EFUnderlyingFeelings" && "needs"}
                    
                    {formPage === "EFNeeds" && "done"}
                    <RightIcon className="mx-2 opacity-40" width={12} />
                    
                </button>
                :<div>Select one item</div>}
            </div>}
            </div>
        
    )
}