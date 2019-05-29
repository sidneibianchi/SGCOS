using NUnit.Framework;
using SGCOS.Domain;
using System;

namespace Tests
{
    public class SgcosServicoTest
    {
       
        [Test]
        public void EstaNaGarantia()
        {
            //TODO:

            Servico serv = new Servico();

            serv.DtAtendimento = DateTime.Parse("25/05/2019");
            serv.QtdDiasGarantia = 30;

            bool fromCall = true;

            //fromCall = serv.VerificaGarantia();

            Assert.IsTrue(fromCall);
        }

        [Test]
        public void NaoEstaNaGarantia()
        {
            //TODO:
            
            Servico serv = new Servico();

            serv.DtAtendimento = DateTime.Parse("05/01/2019");

            serv.QtdDiasGarantia = 30;

            bool fromCall = false;

            //fromCall = serv.VerificaGarantia();

            Assert.IsFalse(fromCall);
        }

    }
}