import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FaHome, FaToggleOn } from "react-icons/fa";

const NavWrap = styled.div`
  position: fixed;
  right: 4%;
  bottom: 4%;
  z-index: 9;
`;

const Btn = styled.button`
  display: block;
  margin-top: 15px;
  border: 0;
  padding: 0;
  background: ${(props) => props.theme.boxColor};
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  svg {
    color: ${(props) => props.theme.accentColor};
  }
  &:hover {
    background: ${(props) => props.theme.accentColor};
    svg {
      color: ${(props) => props.theme.bgColor};
    }
  }
`;

function Nav() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <NavWrap>
      <Link to="/">
        <Btn>
          <FaHome size="28" />
        </Btn>
      </Link>
      <Btn onClick={toggleDarkAtom}>
        <FaToggleOn size="28" />
      </Btn>
    </NavWrap>
  );
}

export default Nav;
