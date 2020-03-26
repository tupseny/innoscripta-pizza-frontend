import React from "react";
import {Nav, Navbar} from "react-bootstrap";

export const NavbarPizza = (props) => {
    const {title} = props;

    const renderBrand = () => <Navbar.Brand href={'/'}>{title}</Navbar.Brand>;
    const renderNav = (items) => <Nav className={'mr-auto'}>{items}</Nav>;

    return <Navbar bg={''}>
        {renderBrand()}

        {/*Left nav*/}
        {renderNav([
            <NavButton key={1} name={'Home'} href={'/'}/>,
            <NavButton key={2} name={'Menu'}/>
        ])}

        {/*Right nav*/}
        {renderNav()}
    </Navbar>
};

const NavButton = (props) => {
    const {name, href} = props;

    const renderButton = () => <Nav.Link href={href ?? '#'}>{name}</Nav.Link>;
    return renderButton();
};