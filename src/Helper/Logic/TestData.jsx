import Ui1 from '../../Assets/image/ui1.svg';
import Ui2 from '../../Assets/image/ui2.svg';
import Ui3 from '../../Assets/image/ui3.svg';
import Ui4 from '../../Assets/image/ui4.svg';
import Ui5 from '../../Assets/image/ui5.svg';
import Ui6 from '../../Assets/image/ui6.svg';
import Ui7 from '../../Assets/image/ui7.svg';
import Ui8 from '../../Assets/image/ui8.svg';
import Ui9 from '../../Assets/image/ui9.svg';
import Ui10 from '../../Assets/image/ui10.svg';
import Ui11 from '../../Assets/image/ui11.svg';
export const testData = [
    {
      sectionTitle: 'Easy',
      description: `These questions are designed for beginners or those needing a refresher on basic traffic rules and regulations. They typically involve straightforward recall of facts and definitions, with clear answer choices. Expect questions like: "What is the speed limit on a school zone?" or "What does a yield sign mean?". The goal is to build confidence and a foundation for understanding more complex concepts.`,
      items: [
        { id: '1', title: 'Warm up', questions: '10 Questions', image: Ui1, started:false },
        { id: '2', title: 'Practice test 1', questions: '25 Questions', image: Ui2, started:false  },
        { id: '3', title: 'Practice test 2', questions: '25 Questions', image: Ui3, started:false  },
        { id: '4', title: 'Practice test 3', questions: '40 Questions', image: Ui4, started:false  },
      ],
    },
    {
      sectionTitle: 'Medium',
      description: `These questions go deeper into traffic laws and require some application of knowledge to real-world scenarios.
        Expect questions that involve interpreting information, recognizing hazards, and making judgments. Examples might include: "How should you proceed if you encounter a yellow light at an intersection?" or "What is the safest course of action during a heavy rainstorm?". The aim is to test critical thinking skills and prepare for the complexities of actual driving situations.`,
      items: [
        { id: '5', title: 'Practice test 4', questions: '20 Questions', image: Ui5, started:false  },
        { id: '6', title: 'Practice test 5', questions: '20 Questions', image: Ui6, started:false  },
        { id: '7', title: 'Practice test 6', questions: '20 Questions', image: Ui7, started:false  },
        { id: '8', title: 'Practice test 7', questions: '40 Questions', image: Ui8, started:false  },
      ],
    },
    {
      sectionTitle: 'Hard',
      description: `These questions challenge even experienced drivers and delve into intricate traffic laws and defensive driving techniques. Expect questions that require multi-step problem-solving, analyzing complex situations, and making quick decisions under pressure. Examples could include: "How would you handle a road rage incident?" or "What are the proper procedures for navigating a multi-lane freeway interchange?". The goal is to assess mastery of driving knowledge and preparedness for unexpected or challenging situations on the road.`,
      items: [
        { id: '9', title: 'Practice test 8', questions: '30 Questions', image: Ui9, locked: true, started:false  },
        { id: '10', title: 'Practice test 9', questions: '30 Questions', image: Ui10, locked: true, started:false  },
        { id: '11', title: 'Practice test 10', questions: '40 Questions', image: Ui11, locked: true, started:false },
      ],
    },
  ];
  