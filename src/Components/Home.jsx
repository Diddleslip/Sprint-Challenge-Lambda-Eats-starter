import React from 'react'
import { Link } from "react-router-dom"
import styled from "styled-components";

const Image = styled.img`
    width: 100vw;
    margin: auto;
    height: 100vh;
`;

export default function Home() {
    return (
        <div>
            <Link to="/pizza">
                Get a pizza
            </Link>

            <Image 
                src="../Assets/Pizza.jpg" 
                alt=" Joe mama"
                />
        </div>
    )
}