import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:10%;
`

export default function Spinner({size}) {
    return(
        <Container>
        <ClipLoader color={"#1E3A8A"} size={size} />
        </Container>
    )
}