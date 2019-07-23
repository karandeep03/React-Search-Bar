import React from 'react';
import './App.css';

class ProductCategoryRow extends React.Component {
  render() {
    let category = this.props.category;

    return (
      <tr>
        <th colSpan='2'>{category}</th>
      </tr>
    )
  }
}

class ProductRow extends React.Component {
  render() {
    let product = this.props.product;
    let name = product.stocked?
              product.name :
              <span
                style={{color: 'red'}}
              >{product.name}</span>

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    let filterText = this.props.filterText,
        isStockOnly = this.props.isStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach( (product) => {
      if(product.name.indexOf(filterText) === -1) {
        return;
      }

      if(isStockOnly && !product.stocked) {
        return;
      }

      if(product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow 
            category = {product.category}
            key = {product.category}
          />
        )
      }

      rows.push(
        <ProductRow 
          product = {product}
          key = {product.name}
        />
      )

      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    let filterText = this.props.filterText,
        isStockOnly = this.props.isStockOnly;

    return (
      <form>
        <input type="text" 
                placeholder="Search..." 
                value={filterText}
                onChange={this.handleFilterTextChange.bind(this)} />
        <p>
          <input type="checkbox"
                 checked={isStockOnly} 
                 onChange={this.handleInStockChange.bind(this)} />
          {' '}
          Only show products in stock
        </p>
      </form>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
      products: [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
      ],
      filterText: '',
      isStockOnly: false
    }
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(isStockOnly) {
    this.setState({
      isStockOnly: isStockOnly
    });
  }

  render() {
    let products = this.state.products,
        filterText = this.state.filterText,
        isStockOnly = this.state.isStockOnly

    return (
      <div className="App">
        <header className="App-header">
        <div style = {{border: '3px solid white', padding: '60px'}}>
        <SearchBar 
            filterText = {filterText}
            isStockOnly = {isStockOnly}
            onFilterTextChange = {this.handleFilterTextChange.bind(this)}
            onInStockChange = {this.handleInStockChange.bind(this)}
          />
          <ProductTable 
            products={products} 
            filterText = {filterText}
            isStockOnly = {isStockOnly}
          />
        </div>
        </header>
      </div>
    );
  }
}

export default App;
