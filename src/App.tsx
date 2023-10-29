import { Label, Link, PrimaryButton, Spinner, TextField } from '@fluentui/react';
import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
    const [content, setContent] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const submit = async (content: string) => {
        setSubmitted(true);
        setLoading(true);
        setLink('');
        setHasError(false);
        setContent('');
        const url = 'https://scratchcard.azurewebsites.net/api/scratchcard';
        try {
            const response: AxiosResponse = await axios.post(url,{ content: content });
            setLink('https://scratchcard.netlify.app?id=' + response.data.id);
            setContent('');
        } catch {
            setLink('');
            setHasError(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <div className='content'>
                <div className='textbox'>
                    <TextField
                        placeholder={content} 
                        multiline 
                        value={content}
                        autoAdjustHeight 
                        onChange={(ev, newText) => { setContent(newText!) }} 
                        label='Enter the html in this box'/>
                </div>
                <div className='button'>
                    <PrimaryButton width={500} text='Submit' onClick={() => submit(content)} disabled={loading}/>
                </div>
                <br/>
                <p><b>Tip: </b>For images, use 400 px x 400 px size. Convert it to base64. Then do - &lt;img src="..."/&gt; </p>
            </div>
            { !submitted && 
                <div>
                    <Label>Preview of above html</Label>
                    <div className='displaybox' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            }
            { loading && <Spinner />}
            { submitted && !hasError && <Link href={link} target='_blank' underline>{link}</Link>}
            { submitted && hasError && <p className='error'>An error has occurred</p>}
        </div>
    );
}

export default App;
