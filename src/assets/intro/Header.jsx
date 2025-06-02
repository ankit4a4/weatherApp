import React from 'react';
import { FaUserEdit } from 'react-icons/fa';

class Header extends React.Component {
    state = {
        savedUser: JSON.parse(localStorage.getItem('weatherUserProfile')),
    };

    componentDidMount() {
        window.addEventListener('userProfileUpdated', this.handleProfileUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('userProfileUpdated', this.handleProfileUpdate);
    }

    handleProfileUpdate = () => {
        const updatedUser = JSON.parse(localStorage.getItem('weatherUserProfile'));
        this.setState({ savedUser: updatedUser });
    };

    getTitle = (gender) => {
        if (gender === 'male') return 'Mr.';
        if (gender === 'female') return 'Miss';
        return '';
    };

    render() {
        const { savedUser } = this.state;

        return (
            <>
                {savedUser ? (
                    <header className="w-full px-4 py-3 bg-black fixed top-0 left-0 z-50 text-white shadow-md flex items-center justify-between gap-4 md:gap-6 border-b border-white/10">
                        <div className="flex items-center justify-between w-[95%]  gap-4">
                            <div className='flex gap-4'>
                                {/* Profile Image */}
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                    <img
                                        src={savedUser.image}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Name */}
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-xl md:text-2xl font-bold leading-tight">
                                        {this.getTitle(savedUser.gender)} {savedUser.firstName} {savedUser.lastName}
                                    </h1>
                                    <p className="text-sm md:text-base text-white/60">Welcome back!</p>
                                </div>
                            </div>

                            <p className='text-3xl cursor-pointer hover:text-[#214686] relative'>
                                <FaUserEdit onClick={this.props.onEdit} />
                            </p>

                        </div>
                    </header>
                ) : null}
            </>
        );
    }
}

export default Header;
