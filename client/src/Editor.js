import React, {useRef} from 'react'
import JoditEditor from 'jodit-react';
const Editor= (props)=> {
    const editor= useRef(null)
    const config = {
        readonly: false, 
        enableDragAndDropFileToEditor: true,
        placeholder : "Chat comes here...",
        buttons: [
            'bold',
            'italic',
            'strikethrough',
            '|',
            'link',
            '|',
            'ol',
            'ul',
            '|',
            'paragraph',
            'source'
        ],
        
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarSticky: true,
        style: {
            background: '#27272E',
            color: 'rgba(255,255,255,0.5)',
        },
        toolbarAdaptive: false,
    }
  return (
    <div className='editor'>
        <JoditEditor
			ref={editor}
			value={props.value}
			config={config}
			tabIndex={1} 
			onBlur={newContent =>{console.log(newContent); props.Changehandler(newContent)}} // preferred to use only this option to update the content for performance reasons
		/>
        
    </div>
  )
}

export default Editor;