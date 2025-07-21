const Product=({id, name, price, category})=>{
    return(
        <div className="Product-Card">
            <h2>{name}</h2>
            <p> Id: {id}</p>
            <p> Price: {price}</p>
            <p> Category: {category}</p>
            
        </div>
    );
};

export default Product;