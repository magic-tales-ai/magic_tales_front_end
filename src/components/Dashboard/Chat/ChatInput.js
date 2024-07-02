import React, { useState } from 'react';
import { Button, Input, Row, Col, Form } from "reactstrap";

function ChatInput(props) {
    const { disabled } = props;
    const [textMessage, settextMessage] = useState("");
    const [file, setfile] = useState({
        name: "",
        size: ""
    });
    const [fileImage, setfileImage] = useState("")

    //function for text input value change
    const handleChange = e => {
        settextMessage(e.target.value);
    }

    //function for send data to onaddMessage function(in Chat/index.js component)
    const onaddMessage = (e, textMessage) => {
        e.preventDefault();
        //if text value is not emptry then call onaddMessage function
        if (textMessage !== "") {
            props.onaddMessage(textMessage, "textMessage");
            settextMessage("");
        }

        //if file input value is not empty then call onaddMessage function
        if (file.name !== "") {
            props.onaddMessage(file, "fileMessage");
            setfile({
                name: "",
                size: ""
            })
        }

        //if image input value is not empty then call onaddMessage function
        if (fileImage !== "") {
            props.onaddMessage(fileImage, "imageMessage");
            setfileImage("")
        }
    }

    return (
        <React.Fragment>
            <div className="chat-input-section px-3 pb-3 mx-lg-5 p-lg-4 pt-lg-0 mb-0 ">
                <Form onSubmit={(e) => onaddMessage(e, textMessage)} >
                    <Row className='g-0'>
                        <Col>
                            <div>
                                <Input type="text" value={textMessage} onChange={(e) => { !disabled && handleChange(e) }} className={`form-control form-control-lg border bg-secondary ${disabled ? 'caret-transparent' : ''}`} placeholder="Write here" />
                            </div>
                        </Col>
                        <Col xs="auto">
                            <div className="chat-input-links">
                                <ul className="list-inline mb-0 ms-0">
                                    <li className="list-inline-item">
                                        <Button type="submit" color="light" className="font-size-16 fw-normal btn-lg chat-send waves-effect waves-light text-white" disabled={disabled}>
                                            <i className="ri-send-plane-2-fill"></i>
                                        </Button>
                                        {/*version voice*/}
{/*                                        <Button type="submit" color="secondary" className="font-size-16 fw-normal btn-lg chat-send waves-effect waves-light text-white">
                                            <i className="ri-mic-fill"></i>
                                        </Button>
*/}                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
}

export default ChatInput;