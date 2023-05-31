import logoHeader from '../images/logo.svg';
function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logoHeader} alt='Надпись на латинице: Место и Россия' />
    </header>
  )
}
export default Header;