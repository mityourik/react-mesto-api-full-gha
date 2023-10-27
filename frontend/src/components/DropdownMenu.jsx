import { forwardRef } from 'react';
import { Link } from "react-router-dom";

const DropdownMenu = forwardRef(({ email, signOut }, ref) => {
    return (
        <div ref={ref} className="header__dropdown-container">
            <p className="header__dropdown-email">{email}</p>
            <Link
                className="header__dropdown-link"
                to="/signin"
                onClick={signOut}>
                Выйти
            </Link>
        </div>
    );
});

export default DropdownMenu;