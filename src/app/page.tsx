import Form from './form';

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Simulador de Seguro Automóvel</h1> */}
        
        {/* Renderize o componente SeguroFormulario */}
        <Form />
      </div>
    </div>
  );
}