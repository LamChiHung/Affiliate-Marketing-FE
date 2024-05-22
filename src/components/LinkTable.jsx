import { useEffect, useRef, useState } from "react";
import DeleteSVG from "../assets/icon/DeleteSVG";
import axios from "../configs/privateAxios";
import { useDispatch, useSelector } from "react-redux";
import { selectLink, savePage, saveMaxPage, saveFormDisplay, saveLinks } from "../redux/features/linkSlice";
import { toast } from "react-toastify";
import { backEndDomain, frontEndDomain } from "../assets/constance/Constance";
import CreateNewLinkForm from "./CreateNewLinkForm";
import CopySVG from "../assets/icon/CopySVG";

function LinkTable(params) {
    let link = useSelector(selectLink);
    let dispatch = useDispatch();
    let pageRef = useRef(link.page);

    useEffect(()=>{
        axios.get(`/api/links?page=${link.page-1}`)
        .then(response => {
            console.log(response.data);
            dispatch(saveLinks(response.data.data.content))
            dispatch(saveMaxPage(response.data.data.totalPages))
        })
        .catch(error => console.log(error));
    },[link.page])

    function handleFindPage() {
        let page = +pageRef.current.value;
        if(page <= link.maxPage && page > 0){
           dispatch(savePage(page));
        } else{
            toast.error("Page not valid");
        }    
    }

    function handleCheckNumber(){
       let value =  pageRef.current.value;
       pageRef.current.value = value.replaceAll(/[^0-9]/g, '');
    }

    function handleChangePage(event){
        let page = +event.target.textContent;
        pageRef.current.value = event.target.textContent;
        dispatch(savePage(page));
    }

    function handleDeleteLink(id) {
        dispatch(saveLinks(link.links.filter(link=>link.id !== id)))
        axios.delete(`${backEndDomain}/api/links/${id}`);
    }

    function changeLink(link) {
        let url = link.split("api/")[1];
        url = frontEndDomain+"/"+url;
        return url
    }

    function handleCreateNewLink(){
        dispatch(saveFormDisplay("flex"));
    }

    function handleCopyToClipBoard(link) {
        let url = changeLink(link);
        navigator.clipboard.writeText(url);
        toast.success("Copy to clipboard success!")
    }

    return(
        <div className="linkTable">
            <div className="linkTable-header">
                <button onClick={()=>handleCreateNewLink()} className="linkTable-createButton">
                Create new Link
                </button>
                <div className="linkTable-header-page">
                    {link.page > 2? <span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">1</span> : null}
                    {link.page > 3? <span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">...</span> : null}
                    {link.page > 1? <span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">{link.page-1}</span> : null}
                    <span className="linkTable-header-page-page current-page">{link.page}</span>
                    {link.page < link.maxPage ? <span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">{link.page+1}</span> : null}
                    {link.maxPage >3 && link.maxPage > (link.page+2) ?<span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">...</span>: null}
                    {link.maxPage >2 && link.maxPage > (link.page+1) ? <span onClick={(event)=>handleChangePage(event)} className="linkTable-header-page-page">{link.maxPage}</span>: null}
                    <input onChange={()=>handleCheckNumber()} ref={pageRef} type="text" defaultValue={link.page} className="linkTable-header-page-input" />
                    <span className="linkTable-header-page-total">/{link.maxPage}</span>
                    <button onClick={()=>handleFindPage()} className="linkTable-header-page-find">Find Page</button>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {link.links.length!==0?
                    link.links.map(link => (
                        <tr key={link.id}>
                        <td>{link.id}</td>
                        <td className="text-left">{link.productName}</td>
                        <td className="text-left">
                            <div className="linkTable-productLink">
                                <span>{changeLink(link.link)}</span>
                                <span onClick={()=>handleCopyToClipBoard(link.link)} className="linkTable-productLink-copy"><CopySVG/></span>
                            </div>
                            </td>
                        <td>{"Active"}</td>
                        <td>{link.createdDate}</td>
                        <td>
                            <span className="deleteIcon"><DeleteSVG/></span>
                            <span onClick={()=>handleDeleteLink(link.id)} className="deleteText">Delete Link</span>
                        </td>
                    </tr>
                    )) 
                    : <tr></tr>}
                </tbody>
            </table>
            <CreateNewLinkForm/>
        </div>
    )    
}
export default LinkTable;