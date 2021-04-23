import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { nameValidate, usernameValidate, emailValidate, phoneValidate } from '../../utils/validate'
import { register } from '../../services/global'
import { useDispatch } from 'react-redux'
import { getUserData, toggleLoading } from '../../redux/actions'

const Register = (props) => {
    const dispatch = useDispatch()

    const [emailErr, logEmailErr] = useState(false)
    const [usernameErr, logUsernameErr] = useState(false)
    const [firstNameErr, logFirstNameErr] = useState(false)
    const [lastNameErr, logLastNameErr] = useState(false)
    const [phoneNumberErr, logPhoneNumberErr] = useState(false)

    const [prePass, setPrePass] = useState('')
    const [passCheck, setPassCheck] = useState(false)


    const [userData, setUserData] = useState({})
    const creditNumberEl = useRef(null)
    const bankEl = useRef(null)

    const history = useHistory()

    useEffect(() => {
        localStorage.clear()
    }, [])

    const emailValidation = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setUserData({
            ...userData,
            email: value
        })

        if (value !== '') {
            logEmailErr(!emailValidate(value))
        } else {
            logEmailErr(false)
        }
    }

    const phoneNumberValidate = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setUserData({
            ...userData,
            phone: value
        })

        if (value !== '') {
            logPhoneNumberErr(!phoneValidate(value))
        } else {
            logPhoneNumberErr(false)
        }
    }

    const usernameValidation = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setUserData({
            ...userData,
            username: value
        })

        if (value !== '') {
            logUsernameErr(!usernameValidate(value))
        } else {
            logUsernameErr(false)
        }
    }

    const firstNameValidation = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setUserData({
            ...userData,
            firstName: value
        })

        if (value !== '') {
            logFirstNameErr(!nameValidate(value))
        } else {
            logFirstNameErr(false)
        }
    }

    const lastNameValidation = (e) => {
        let value = e.target.value || ''

        setUserData({
            ...userData,
            lastName: value
        })

        if (value !== '') {
            logLastNameErr(!nameValidate(value))
        } else {
            logLastNameErr(false)
        }
    }

    const getPrePass = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setPrePass(value)
    }

    const confirmPass = (e) => {
        let value = e.target.value || ''
        value = value.trim()
        setUserData({
            ...userData,
            password: value
        })

        if (value === '') {
            setPassCheck(false)
        }
        else if (value === prePass && value.length >= 6) {
            setPassCheck(false)
        } else {
            setPassCheck(true)
        }
    }

    const checkValidate = () => {
        if (!emailErr && !usernameErr && !firstNameErr && !lastNameErr && !passCheck) {
            return true
        } else return false
    }

    const submitHandle = (e) => {
        if (checkValidate()) {
            const credit = {
                number: creditNumberEl.current.value,
                bank: bankEl.current.value
            }
            const data = {
                ...userData,
                credit
            }

            dispatch(toggleLoading(true))
            register(data)
                .then(res => {
                    if (res.data && res.data.status) {
                        dispatch(toggleLoading(false))
                        dispatch(getUserData({
                            ...res.data.user,
                            token: res.data.token,
                            login: true
                        }))
                        history.replace('/')
                    } else {
                        console.log('Đăng kí thất bại')
                    }
                })
                .catch(err => console.log(err))
                .then(() => {
                    dispatch(toggleLoading(false))
                })

        } else {
            alert('Thông tin không hợp lệ!')
        }

        e.preventDefault()
    }

    return (
        <>
            <div className='sign-in-container'>
                <div className='sign-in-header'>
                    <div className='sign-in-logo-wrapper'>
                        <Link to='/'>
                            <img src='/images/logo.png' alt='logo' />
                        </Link>
                    </div>
                    <h1 className='sign-in-title'>Welcome!</h1>
                </div>
                <form onSubmit={(e) => submitHandle(e)} id='sign-in-form'>
                    <span style={{ fontFamily: 'mainFont' }}>Họ Tên:</span>
                    <div className='form-name'>
                        <input onChange={(e) => firstNameValidation(e)} className={firstNameErr ? 'validate-error' : ''} required name='firstName' placeholder='Tên' />
                        <input onChange={(e) => lastNameValidation(e)} className={lastNameErr ? 'validate-error' : ''} required name='lastName' placeholder='Họ' />
                    </div>
                    <label htmlFor='email'>Email: </label>
                    <input onChange={(e) => emailValidation(e)} className={emailErr ? 'validate-error' : ''} required id='email' placeholder='example@email.com' name='email' />
                    <label htmlFor='phone'>Số điện thoại: </label>
                    <input onChange={phoneNumberValidate} className={phoneNumberErr ? 'validate-error' : ''} required id='phone' placeholder='+84...' name='phone' />
                    <label htmlFor='credit_number'>Số tài khoản: </label>
                    <input required id='credit_number' ref={creditNumberEl} placeholder='Số tài khoản hoặc số thẻ' name='credit-number' />
                    <label htmlFor='bank'>Ngân hàng: </label>
                    <input required ref={bankEl} id='bank' placeholder='Tên ngân hàng' name='bank' />
                    <label htmlFor='username'>Tên đăng nhập: </label>
                    <input onChange={(e) => usernameValidation(e)} className={usernameErr ? 'validate-error' : ''} required id='username' placeholder='ex: username123' name='username' />
                    <label htmlFor='password'>Mật khẩu: </label>
                    <input onChange={(e) => getPrePass(e)} required type='password' placeholder='a-z, 0-9, ít nhất 6 kí tự.' id='password' name='password' />
                    <label htmlFor='re-password'>Xác nhận mật khẩu: </label>
                    <input onChange={(e) => confirmPass(e)} required className={passCheck ? 'validate-error' : ''} type='password' id='re-password' placeholder='******' name='rePassword' />
                    <div className='form-btn'>
                        <Link to='/login' className='sign-btn'>
                            Đăng nhập
                        </Link>
                        <button className='sign-btn active'>
                            Đăng ký
                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Register