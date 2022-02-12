import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useEffect } from "react";
import { detailsProduct } from '../actions/productActions';
import data from "../data.js";

export default function ProductScreen(props){
    const product = data.products.find((x)=>x._id === props.match.params.id);
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, } = productDetails;
    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);
    return(
        <div>
            {
                loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                : ( <div>
                        <Link to="/">Back to result</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name}></img>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li><h2>{product.name}</h2></li>
                                    <li><Rating rating={product.rating} numReviews={product.numReviews}></Rating></li>
                                    <li><b>Price:</b>&nbsp;₱{product.price}</li>
                                    <li><b>Description:</b><p>&emsp;{product.description}</p></li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="addToCart">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price:&nbsp;</div>
                                                <div className="addToCartPrice">₱{product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status:&nbsp;</div>
                                                <div>
                                                    {product.countInStock > 0 ? (<span className="success">In Stock</span>):
                                                    (<span className="error">Unavailable</span>)}
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button className="primary block">Add to cart</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    );
}