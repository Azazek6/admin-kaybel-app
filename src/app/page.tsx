import SigninFom from "@/modules/auth/presentation/components/SigninFom";

const Auth = () => {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-gray-900">
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 md:px-24 lg:w-[45%] xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-12">
            <img
              src="/images/logo-mini.webp"
              alt="Logo"
              className="h-22 w-auto object-contain rounded-full"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Bienvenido
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Por favor ingresa tus datos para acceder al panel.
            </p>
          </div>

          <SigninFom />
        </div>
      </div>

      <div className="hidden lg:block lg:w-[55%] relative">
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        <img
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop"
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-16 text-white">
          <div className="max-w-lg">
            <h2 className="text-3xl font-medium leading-snug tracking-tight drop-shadow-md">
              "La elegancia es la única belleza que nunca se desvanece."
            </h2>
            <p className="mt-4 text-sm font-light text-gray-200 drop-shadow-md">
              — Administra eficientemente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
