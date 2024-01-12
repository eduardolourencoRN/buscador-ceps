export default function handleSearch(){
    setLoading(true);
    setErro('');
    setResultado(null);

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      setErro('Formato de CEP inválido. Use XXXXX-XXX.');
      setLoading(false);
      return;
    }

    fetchUserData(cep)
      .then(userData => {
        setResultado(userData);
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        Keyboard.dismiss();
      })
      .catch(error => {
        console.log(error.response.status);

        if (error.response?.status === 404) {
          setErroEmpty('Insira um CEP válido');
        }
        if (error.response?.status === 400) {
          setErro('Insira um CEP válido');
        }
        setLoading(false);
        console.error('Error:', error);
      });
  };
