import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import {Chip} from '@material-ui/core'
import {clearCartAction} from '../../redux/redux'
import {useDispatch} from 'react-redux'

const OrderPlaced = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCartAction());
    }, [])

  return (
    <>
      Thank You For Buying Medicine With Us.
      <center>
                <Link to="/myorder" style={{ textDecoration: "none" }}>
                  <Chip label="View Orders" variant="outlined" />
                </Link>
              </center>
    </>
  )
}

export default OrderPlaced;
