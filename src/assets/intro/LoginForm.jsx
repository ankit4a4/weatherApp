import React from 'react';
import { FaCamera, FaTimes } from 'react-icons/fa';

class LoginForm extends React.Component {
  state = {
    image: '',
    firstName: '',
    lastName: '',
    gender: '',
    imageError: false,
  };

  fileInputRef = React.createRef();

  componentDidMount() {
    const storedProfile = localStorage.getItem('weatherUserProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      this.setState({
        image: profile.image || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        gender: profile.gender || '',
        imageError: false, // ✅ Fix added here
      });
    }
  }

  handleImageClick = () => {
    this.fileInputRef.current.click();
  };

  handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ image: reader.result, imageError: false });
      };
      if (file) reader.readAsDataURL(file);
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { image, firstName, lastName, gender } = this.state;

    // ✅ Improved validation: also trims spaces
    if (!image || !firstName.trim() || !lastName.trim() || !gender) {
      this.setState({
        imageError: !image,
      });
      return;
    }

    localStorage.setItem('weatherUserProfile', JSON.stringify(this.state));
    window.dispatchEvent(new Event('userProfileUpdated'));

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { image, firstName, lastName, gender, imageError } = this.state;

    const emojis = [
      '❤️', '😂', '☁️', '🌧️', '🔥', '💧', '🌈', '☀️',
      '🌪️', '❄️', '🌤️', '😎', '🌀', '🌫️', '😄', '🌞',
      '🌬️', '💨', '🤩', '🥶', '😅', '🌻', '⛅', '💥'
    ];

    return (
      <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center px-4 py-8">

        {/* Floating Emojis */}
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="absolute text-3xl animate-floating"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-2rem',
              animationDelay: `${index * 0.8}s`,
            }}
          >
            {emoji}
          </span>
        ))}

        {/* Form */}
        <form
          onSubmit={this.handleSubmit}
          className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-lg text-white space-y-6 border border-white/20"
        >
          <div className="absolute top-4 right-4 z-50">
            <div
              onClick={this.props.onClose}
              className="text-red-500 cursor-pointer hover:text-red-700 text-2xl">
              <FaTimes />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex justify-center">
            <div
              onClick={this.handleImageClick}
              className={`w-28 h-28 rounded-full ${imageError ? 'border-4 border-red-500' : 'border-4 border-white/30'} overflow-hidden cursor-pointer relative flex items-center justify-center shadow-md`}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-white/70 text-sm">
                  <FaCamera className="text-xl mb-1" />
                  <span>Upload</span>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={this.handleChange}
                ref={this.fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          {/* First Name */}
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              placeholder="Enter your first name"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              placeholder="Enter your last name"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={this.handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white"
              required
            >
              <option value="">Select gender</option>
              <option className="text-black" value="male">Male</option>
              <option className="text-black" value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition duration-300"
          >
            Save Profile
          </button>
        </form>

        <style>{`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
          }
          .animate-floating {
            animation: floatUp 8s linear infinite;
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }
}

export default LoginForm;
