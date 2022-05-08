import { Label, Link, PrimaryButton, TextField } from '@fluentui/react';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
    const [content, setContent] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');

    const submit = async (content: string) => {
        setSubmitted(true);
        await axios.post('/api/Scratchcard',{})
        setLink('https://www.google.com');
        setHasError(false);
    };

    return (
        <div className="app">
            <div className='content'>
                <div className='textbox'>
                    <TextField
                        placeholder={content} 
                        multiline 
                        autoAdjustHeight 
                        onChange={(ev, newText) => { setContent(newText!) }} 
                        label='Enter the html in this box'/>
                </div>
                <div className='button'>
                    <PrimaryButton width={500} text='Submit' onClick={() => submit(content)}/>
                </div>
            </div>
            { !submitted && 
                <div>
                    <Label>Preview of above html</Label>
                    <div className='displaybox' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            }
            { submitted && hasError && <Link href={link} target='_blank' underline>{link}</Link>}
            { submitted && !hasError && <p className='error'>An error has occurred</p>}
        </div>
    );
}

export default App;
