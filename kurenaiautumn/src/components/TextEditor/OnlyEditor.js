import EditorJS from "@editorjs/editorjs"



function OnlyEditor(){

    const editor = new EditorJS({
        autofocus: true,
        holder: 'editorjs',
        tools: {
        }
      });

    function saving(){
      const output = document.getElementById('output');
      editor.save().then( savedData => {
        output.innerHTML = JSON.stringify(savedData, null, 4);
      })
    }
    return(
        <div>
            <div id="editorjs"></div>
            <button id="save-button" onClick={saving}>Save</button>
        </div>
    );
}

export default OnlyEditor