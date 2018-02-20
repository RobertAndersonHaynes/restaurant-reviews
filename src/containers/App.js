import React, { Component } from 'react'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm'
import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants,
      reviews,
      selectedId: restaurants[0].id,
      userName: '',
      rating: '',
      content: ''
    }
    this.restaurantClick = this.restaurantClick.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.trackConsumption = this.trackConsumption.bind(this);

  }

  handleClearForm(event) {

    event.preventDefault();
    this.setState({
      userName: '',
      rating: '',
      content: ''
    })
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  handleUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  handleRatingChange(event) {
    this.setState({rating: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  trackConsumption(submission) {
  this.setState({ reviews: this.state.reviews.concat(submission) })
}

  handleSubmit(event) {
    event.preventDefault();
      let formPayload = {
        restaurant_id: this.state.selectedId,
        name: this.state.userName,
        rating: this.state.rating,
        content: this.state.content
      };
      this.trackConsumption(formPayload);
      this.handleClearForm(event);
    }

  render() {
    let restaurantComponents = restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })

    let relevantReviews = this.state.reviews.filter((review) =>
      (this.state.selectedId === review.restaurant_id)
    )

    return(

      <div>
        <div className="row">
          <div className="small-3 columns">
            <h1>Restaurant</h1>
            {restaurantComponents}
          </div>
          <div className="small-9 columns">
            <h2>Reviews for {this.selectedRestaurant().name}</h2>
            <Reviews data={relevantReviews} />
            <form className="callout" onSubmit={this.handleSubmit} id={this.selectedRestaurant().id}>
              <ReviewForm
                label='Name'
                name='userName'
                onChange={this.handleUserNameChange}
                value={this.state.userName}
                type="text"
              />
              <ReviewForm
                label='Score'
                name='rating'
                onChange={this.handleRatingChange}
                value={this.state.rating}
                type="number"
              />
              <ReviewForm
                label='Review'
                name='content'
                onChange={this.handleContentChange}
                value={this.state.content}
                type="text"
              />
              <input type="submit" className="button" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App
