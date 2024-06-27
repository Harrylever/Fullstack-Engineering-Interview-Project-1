import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full h-[85vh]">
      <div className="w-full h-full flex flex-row items-center justify-center">
        <button
          type="button"
          onClick={() => navigate('auth/register')}
          className="bg-black text-white font-rethink-sans py-3 px-10 rounded-lg hover:shadow-lg duration-300"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}

export default LandingPage
