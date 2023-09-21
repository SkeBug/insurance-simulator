'use client'

import React, { useState } from 'react';

export default function Form() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        categoria: '',
        cilindrada: '',
    });
    const [premioAnualRC, setPremioAnualRC] = useState<number | null>(null);
    const [premioSemestralRC, setPremioSemestralRC] = useState<number | null>(null);
    const [premioTrimestralRC, setPremioTrimestralRC] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoria = e.target.value;

        console.log('Step:', step)
        console.log('Categoria selecionada:', categoria);

        setFormData({
            ...formData,
            categoria,
            cilindrada: '', // Reseta a cilindrada ao mudar a categoria
        });
    };

    const handleCilindradaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cilindrada = e.target.value;

        console.log('Cilindrada selecionada:', cilindrada);

        setFormData({
            ...formData,
            cilindrada,
        });
    };

    const handleNextStep = () => {

        console.log('Step:', step);

        // if (step === 3) {
        //     // Calcula o prêmio RC com base na categoria e cilindrada (valor predefinido)
        //     const premioRC = calcularPremioRC(formData.categoria, formData.cilindrada);

        //     console.log('Categoria:', formData.categoria);

        //     console.log('Cilindrada:', formData.cilindrada);
            
        //     console.log('Prêmio RC:', premioRC);

        //     // Calcula os prêmios anual, semestral e trimestral com base no prêmio RC
        //     const premioAnual = premioRC;
        //     const premioSemestral = premioRC / 2;
        //     const premioTrimestral = premioRC / 4;

        //     // Define os estados correspondentes
        //     setPremioAnualRC(premioAnual);
        //     setPremioSemestralRC(premioSemestral);
        //     setPremioTrimestralRC(premioTrimestral);
        // } else {
        //     setStep(step + 1); 

        //     console.log('Step:', step);
        // }

        if (formData.categoria && formData.cilindrada) {
            // Calcula o prêmio RC com base na categoria e cilindrada (valor predefinido)
            const premioRC = calcularPremioRC(formData.categoria, formData.cilindrada);

            console.log('Categoria:', formData.categoria);

            console.log('Cilindrada:', formData.cilindrada);
            
            console.log('Prêmio RC:', premioRC);

            // Calcula os prêmios anual, semestral e trimestral com base no prêmio RC
            const premioAnual = premioRC;
            const premioSemestral = premioRC / 2;
            const premioTrimestral = premioRC / 4;

            // Define os estados correspondentes
            setPremioAnualRC(premioAnual);
            setPremioSemestralRC(premioSemestral);
            setPremioTrimestralRC(premioTrimestral);

            setStep(step + 1); 

            console.log('Step:', step);
        } else {
            setStep(step + 1); 
        }
    };

    function calcularPremioRC(categoria: string, cilindrada: string) {
        // Defina a tabela de prêmios RC com base nas categorias e cilindradas
        const premiosRC: Record<string, Record<string, number>> = {
            'Ligeiros Particulares até 9 Lugares': {
                'ATÉ 1600 CC': 27147.41,
                'DE 1601 A 2500 CC': 29409.70,
                'MAIS DE 2500 CC': 32803.13,
            },
            'Ligeiro de Aluguer até 9 Lugares (incl. Viaturas Casamentos e Funerais)': {
                'ATÉ 1600 CC': 32803.13,
                'DE 1601 A 2500 CC': 38458.84,
                'MAIS DE 2500 CC': 44114.55,
            },
            'Ligeiro Misto - 650kg até 1100kg': {
                'ATÉ 1500 CC': 36196.55,
                'DE 1501 A 2500 CC': 38458.84,
                'MAIS DE 2500 CC': 41852.27,
            },
            // ... Outras categorias e cilindradas
        };

        // Verifique se a categoria e a cilindrada estão na tabela de prêmios RC
        if (categoria in premiosRC && cilindrada in premiosRC[categoria]) {
            return premiosRC[categoria][cilindrada];
        } else {
            return 0; // Valor padrão se não encontrar na tabela
        }
    }

    const cilindradasPorCategoria: Record<string, string[]> = {
        'Ligeiros Particulares até 9 Lugares': ['ATÉ 1600 CC', 'DE 1601 A 2500 CC', 'MAIS DE 2500 CC'],
        'Ligeiro de Aluguer até 9 Lugares (incl. Viaturas Casamentos e Funerais)': ['ATÉ 1600 CC', 'DE 1601 A 2500 CC', 'MAIS DE 2500 CC'],
        'Ligeiro Misto - 650kg até 1100kg': ['ATÉ 1500 CC', 'DE 1501 A 2500 CC', 'MAIS DE 2500 CC'],
        // ... Outras categorias e suas cilindradas correspondentes
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-4">
                <h1 className="text-2xl font-bold mb-4">Simulador de Seguro Automóvel</h1>
                {step === 1 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Etapa 1: Dados Pessoais</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                                    Telefone:
                                </label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Etapa 2: Descrição do Veículo</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                    Categoria:
                                </label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleCategoriaChange}
                                    className="border rounded-md p-2 w-full"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="Ligeiros Particulares até 9 Lugares">Ligeiros Particulares até 9 Lugares</option>
                                    <option value="Ligeiro de Aluguer até 9 Lugares (incl. Viaturas Casamentos e Funerais)">Ligeiro de Aluguer até 9 Lugares (incl. Viaturas Casamentos e Funerais)</option>
                                    <option value="Ligeiro Misto - 650kg até 1100kg">Ligeiro Misto - 650kg até 1100kg</option>
                                    {/* ... Outras opções de categoria */}
                                </select>


                            </div>
                            {formData.categoria && (
                                <div className="mb-4">
                                    <label htmlFor="cilindrada" className="block text-sm font-medium text-gray-700">
                                        Cilindrada:
                                    </label>
                                    <select
                                        id="cilindrada"
                                        name="cilindrada"
                                        value={formData.cilindrada}
                                        onChange={handleCilindradaChange}
                                        className="border rounded-md p-2 w-full"
                                    >
                                        <option value="">Selecione uma cilindrada</option>
                                        {cilindradasPorCategoria[formData.categoria].map((cilindrada) => (
                                            <option key={cilindrada} value={cilindrada}>
                                                {cilindrada}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </form>
                    </div>
                )}


                {step === 3 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Etapa 3: Prêmios RC</h2>

                        <h3 className="text-base font-medium mb-1">Categoria: {formData.categoria}</h3>
                        <h3 className="text-base font-medium mb-1">Cilindrada: {formData.cilindrada}</h3> <br/>

                        <p>Prêmio Anual RC: {premioAnualRC !== null ? premioAnualRC.toFixed(2) + " AOA" : "0 AOA"}</p>
                        <p>Prêmio Semestral RC: {premioSemestralRC !== null ? premioSemestralRC.toFixed(2) + " AOA" : "0 AOA"}</p>
                        <p>Prêmio Trimestral RC: {premioTrimestralRC !== null ? premioTrimestralRC.toFixed(2) + " AOA" : "0 AOA"}</p>
                    </div>
                )}

                <div className="mt-4 flex justify-between">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Anterior
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            onClick={handleNextStep}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Próxima
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
