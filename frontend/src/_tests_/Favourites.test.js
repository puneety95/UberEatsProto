import React from "react";
import { render, fireEvent } from '@testing-library/react'
import Cart from '../components/Cart';
it("RenderCheck", () => {
    const {queryByTitle} = render(<Cart/>);
    
})    