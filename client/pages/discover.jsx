import React from 'react';
import ProfileCard from '../components/profile-card';
import ProfileDetail from '../components/profile-detail';
import AppContext from '../lib/app-context';

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      photos: ['/images/woofles-placeholder.webp']
    };
    this.getDoggo = this.getDoggo.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  getDoggo() {
    this.setState({ isLoading: true });
    return fetch('/api/discover', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('woofles-jwt')
      }
    })
      .then(res => res.json())
      .then(data => {
        const doggo = data[0].animal;
        const organization = data[1].organization;
        let photos;
        if (doggo.photos.length > 0) {
          photos = doggo.photos.map(x => x.full);
        } else {
          photos = ['/images/woofles-placeholder.webp'];
        }
        let breed;
        if (doggo.breeds.mixed) {
          breed = doggo.breeds.primary + ' (mix)';
        } else {
          breed = doggo.breeds.primary;
        }
        const tags = doggo.tags;
        let characteristics;
        if (tags.length === 0) {
          characteristics = null;
        } else {
          characteristics = tags
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(', ');
        }
        const attributes = Object
          .keys(doggo.attributes)
          .filter(x => doggo.attributes[x] === true);
        let health;
        if (attributes.length === 0) {
          health = null;
        } else {
          health = attributes
            .map(x => x.replace('spayed_neutered', 'Spayed/Neutered'))
            .map(x => x.replace('shots_current', 'Vaccinated'))
            .map(x => x.replace('house_trained', 'House Trained'))
            .map(x => x.replace('special_needs', 'Special Needs'))
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(', ');
        }
        const environment = Object
          .keys(doggo.environment)
          .filter(x => doggo.environment[x] === true);
        let home;
        if (environment.length === 0) {
          home = null;
        } else {
          home = environment
            .map(x => x.replace('dogs', 'other dogs'))
            .map(x => x.replace('cats', 'other cats'))
            .map(x => x[0].toUpperCase() + x.slice(1))
            .join(', ');
        }
        const { id: doggoId, name, distance, description, age, gender, size, url } = doggo;
        const { id: orgId, name: org, email, phone } = organization;
        const contact = organization.address;
        const address1 = organization.address.address1;
        const address2 = `${contact.city}, ${contact.state} ${contact.postcode}`;
        const location = `${contact.city}, ${contact.state}`;
        this.setState({
          address1,
          address2,
          age,
          breed,
          characteristics,
          description,
          distance,
          doggoId,
          email,
          gender,
          health,
          home,
          isLoading: false,
          location,
          name,
          org,
          orgId,
          phone,
          photos,
          size,
          url
        });
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  handleSwipe(direction) {
    let reqBody;
    if (direction === 'right') {
      reqBody = Object.assign({}, this.state, { isLiked: true });
    } else if (direction === 'left') {
      reqBody = Object.assign({}, this.state, { isLiked: false });
    }
    fetch('/api/swipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': window.localStorage.getItem('woofles-jwt')
      },
      body: JSON.stringify(reqBody)
    })
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed to POST');
        this.getDoggo();
      })
      .catch(err => {
        const { handleNetworkError } = this.context;
        handleNetworkError(err);
      });
  }

  componentDidMount() {
    this.getDoggo();
  }

  render() {
    const { route } = this.context;
    if (this.state.isLoading) {
      return (
        <div className='container'>
          <div className='row'>
            <h1 className='page-title mt-0 mb-0'>Henlo Fren</h1>
          </div>
          <div className='loading-spinner-container'>
            <img className='loading-spinner' src='/images/doggo-loading-spinner.gif' alt='Loading Spinner' />
          </div>
        </div>
      );
    } else {
      if (route.path === 'discover') {
        return (
          <div className='container'>
            <div className='row'>
              <h1 className='page-title mt-0 mb-0'>Henlo Fren</h1>
            </div>
            <ProfileCard data={this.state}
              handleSwipe={this.handleSwipe} />
          </div>
        );
      }
      if (route.path === 'details') {
        return <ProfileDetail data={this.state} />;
      }
    }
  }
}

Discover.contextType = AppContext;
