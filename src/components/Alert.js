import React ,{useState}from 'react'
import successSvg from "../success.svg";
import dangerSvg from "../danger.svg";

const Alert = (props) => {
    const [svg] = useState({
        width:"20px"
      });
    const [alertBoxStyle] = useState({
        position :"absolute",
        left: "0",
        right: "0",
        margin: "auto",
        textAlign: "center",
        width: "25%"
      });
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={alertBoxStyle} role="alert">
        <img style={svg} src={props.alert.type === "success" ? successSvg : props.alert.type === "danger" ? dangerSvg : null} alt="Your SVG" />
        <strong></strong> {props.alert.msg}
    </div>
  )
}

export default Alert