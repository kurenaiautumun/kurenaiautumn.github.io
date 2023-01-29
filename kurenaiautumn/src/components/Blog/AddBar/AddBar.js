import React from 'react'

function AddBar() {
    let a = 1
    function addElem(tag, e){

        console.log('target = ', e.target)
        console.log('tag = ', tag)
        let elem = e.target

        let newElem = document.createElement(tag)

        if (tag=='img'){
            newElem.setAttribute('src', './download.png')
        }

        else{
            newElem.innerHTML = a
            }
        newElem.setAttribute("contenteditable", true)
        a = a + 1

        console.log('elem = ', elem)
        console.log('before element = ', elem.parentNode.parentNode.nextSibling)

        let contain = document.getElementById('container')

        //contain.appendChild(newDiv)
        console.log('contain = ', contain)

        contain.insertBefore(newElem, elem.parentNode.parentNode.nextSibling);
    }
    return (
        <div>
            <button class="btn-primary" onClick={addElem.bind(this, 'p')}>P</button><button class="btn-primary" onClick={addElem.bind(this, 'h1')}>H1</button><button class="btn-primary" onClick={addElem.bind(this, 'h2')}>H2</button><button class="btn-primary" onClick={addElem.bind(this, 'img')}>Image</button>
        </div>
    )
}

export default AddBar