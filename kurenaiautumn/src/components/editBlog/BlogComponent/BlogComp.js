import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './BlogComp.css'
import AddBar from '../AddBar/AddBar';

function BlogComp() {
    let a = 1

        function RemoveElem(elem){
            console.log('in remove = ', elem.parentNode.parentNode)
            elem.parentNode.parentNode.remove();
        }

        function addBar(e){
            console.log('add bar = ', e.target)
        }

    return (
        <div id="container">
          <div class="dropdown">
            <h1 id="MainHeading" contenteditable={true}>sdf</h1>
            <div class='main' onClick={addBar}>
              <AddBar />
            </div>
          </div>
        </div>
    )
};

export default BlogComp;