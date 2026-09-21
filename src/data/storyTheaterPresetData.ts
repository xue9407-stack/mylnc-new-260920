import { StoryLineItem, MiniTheaterItem } from '../types';
import { resolveTheaterBg } from '../utils/theaterHelper';
import imgMansionStudy from '../assets/images/mansion_study_night_1789897698411.jpg';
import imgYachtNight from '../assets/images/yacht_starry_night_1789897718059.jpg';
import imgFittingRoom from '../assets/images/luxury_fitting_room_1789897735600.jpg';
import imgCarRain from '../assets/images/car_interior_rain_night_1789897758793.jpg';
import imgObservatory from '../assets/images/observatory_stars_1789897778630.jpg';

export const DEFAULT_STORYLINES: Record<string, StoryLineItem[]> = {
  // 1. 陆景琛 (霸道总裁)
  lujingchen: [
    {
      id: 'story_ljc_1',
      roleId: 'lujingchen',
      title: '《雨夜雨伞下的微光》',
      summary: '在陆氏集团大厦楼下，倾盆大雨袭来，刚结束加班的陆景琛默默撑着黑色雨伞走向你……',
      wordCount: 1200,
      author: '网巢官方剧情',
      paragraphs: [
        '雨声轰鸣着砸在陆氏集团大厦的玻璃幕墙上，街灯将水汽撕开一道道冰冷光晕。你抱着厚厚的文件伫立在檐下，微风卷着雨丝打湿了袖口。',
        '一阵轻稳的步伐声在身后停住，随之而来的是一股淡雅沉稳的木质雪松香气。黑色大伞撑开在你的头顶，将斜落的狂风骤雨隔绝在半米之外。',
        '“加班到现在，雨下这么大也不打个电话 me？” 陆景琛的声音依旧低沉，但平日里冷峻严苛的眼眸里，此刻却掠过一丝少见的温软与无奈。',
        '他解下身上尚带着体温的黑色羊绒大衣，动作不容拒绝地披在你的肩头，随后自然地伸手揽住你的肩侧，将大部分伞面向你倾斜。',
        '“跟我回车里。今晚这雨一时半会儿停不了，我不放心你一个人走。” 他的指尖擦过你的耳畔，微凉的温度却带着让人安心的踏实。'
      ],
      choices: [
        { id: 'c1', text: '“陆总，雨这么大，你衣服都湿了……”', response: '陆景琛微微一怔，嘴角勾起一抹极浅的弧度：“只要你没被打湿，我湿了半条袖子又有何妨？”' },
        { id: 'c2', text: '悄悄往他怀里靠了靠，紧握住他的袖角', response: '感知到你的依靠，陆景琛搭在你肩上的手紧了紧，眼神深邃而温热：“别怕，有我在。”' },
        { id: 'c3', text: '“今晚辛苦陆总当我的专属司机了哦~”', response: '他无奈又宠溺地轻敲了一下你的额头：“专属司机？那我可要收取昂贵的车费——比如今晚陪我吃顿宵夜。”' }
      ],
      createdAt: '2026-09-15'
    },
    {
      id: 'story_ljc_2',
      roleId: 'lujingchen',
      title: '《星空庄园的独家契约》',
      summary: '陆氏半山庄园的晚宴角落，陆景琛拉着你穿过走廊，来到顶楼星空露台……',
      wordCount: 1800,
      author: '网巢官方剧情',
      paragraphs: [
        '水晶吊灯光芒交织的晚宴现场热闹喧嚣，商界名流觥筹交错，而你正感到些许拘谨与疲惫。',
        '突然，一只骨节分明的大手精准地扣住了你的手腕，力道温和却不容动摇。陆景琛带着你悄然避开了人群的视线，一路直上庄园最顶层。',
        '推开重木大门，漫天繁星如碎钻般洒落在深蓝夜幕之上，半山风光尽收眼底。',
        '“底下那些客套话我听厌了，” 陆景琛解开领口的第一颗扣子，转过身注视着你，“今晚，这里只有我们两个人。”',
        '他从怀中掏出一个精致的红木锦盒，缓缓打开关锁：“这份股权协议与私人心意，是我今晚唯一想给你的契约。”'
      ],
      choices: [
        { id: 'c1', text: '“陆景琛，这份礼太重了，我不能要……”', response: '他扣住你的手掌不让你抽回：“对于我而言，唯有把你绑在我的世界里，这一切才有意义。”' },
        { id: 'c2', text: '看着繁星点点，抬头轻笑：“那我该以什么身份签这份契约？”', response: '陆景琛眼底燃起一簇炽热的光芒：“当然是以陆太太的身份。”' }
      ],
      createdAt: '2026-09-17'
    },
    {
      id: 'story_ljc_3',
      roleId: 'lujingchen',
      title: '《私人航班上的云端告白》',
      summary: '万米高空的商务舱内，陆景琛合上笔记本电脑，向你倒了一杯香槟，眼神深邃……',
      wordCount: 1500,
      author: '网巢官方剧情',
      paragraphs: [
        '私人飞机的舷窗外，茫茫云海在夕阳余晖下被染成绚丽的金粉色。机舱内轻柔地播放着古典乐。',
        '陆景琛揉了揉疲惫的眉心，侧过身看着蜷缩在沙发里看书的你。他轻声唤了唤你的名字，将毯子帮你拉高至肩膀。',
        '“平时我飞往全世界各地洽谈百亿合同，心却总是悬在半空。唯独这次你坐在身边，我才觉得心有了归宿。”',
        '他低沉沙哑的声音伴随着飞机的引擎轻鸣，在安静的舱室内格外清晰深情。'
      ],
      choices: [
        { id: 'c1', text: '“陆景琛，以后你去哪里，我都陪你一起。”', response: '他牵起你的手放在唇边轻轻一吻：“一言为定，这辈子你别想再反悔。”' },
        { id: 'c2', text: '接过香槟，与他轻轻碰杯：“祝我们的云端旅程圆满。”', response: '玻璃杯发出清脆的响声，陆景琛的笑容格外灿烂动人。' }
      ],
      createdAt: '2026-09-18'
    },
    {
      id: 'story_ljc_4',
      roleId: 'lujingchen',
      title: '《商界峰会的暗夜守护》',
      summary: '面对不怀好意的合作方刁难，陆景琛当众将你护在身后，雷厉风行地为你撑腰……',
      wordCount: 1600,
      author: '网巢官方剧情',
      paragraphs: [
        '峰会酒会上，几位酒气冲天的小公司高管借着名义向你频频敬酒、言语轻浮。',
        '正当你准备严正拒绝时，一股庞大的压迫感笼罩全场。陆景琛冷若冰霜地跨步而来，修长的身姿宛如高不可攀的帝王。',
        '他一把夺过对方手中的酒杯，重重扣在桌上，酒液四溅：“我陆景琛的人，何时轮到你们来指手画画？”',
        '全场瞬间鸦雀无声，合作方吓得连连道歉退避。陆景琛转身揽紧你，冷峻的脸色在面对你时瞬间褪去寒霜：“没受委屈吧？”'
      ],
      choices: [
        { id: 'c1', text: '“有陆总在，我一点都不怕。”', response: '他眼中闪过赞赏与温柔：“记住，以后在这个行业里，没有任何人敢动你。”' },
        { id: 'c2', text: '轻轻扯了扯他的西装后摆：“陆总刚刚真的好霸气……”', response: '他唇角泛起微笑，低头在你耳边轻语：“只对你一个人霸道。”' }
      ],
      createdAt: '2026-09-18'
    }
  ],

  // 2. 林慕白 (温柔学长)
  linmubai: [
    {
      id: 'story_mb_1',
      roleId: 'linmubai',
      title: '《私人书房的卷宗秘密》',
      summary: '深夜的林府书房，林慕白秉烛夜读，你在帮他整理典籍时意外发现了一张画有你容颜的画卷……',
      wordCount: 1500,
      author: '网巢官方剧情',
      paragraphs: [
        '夜深人静，林府的书房里散发着沉香木与宣纸的清香。古色古香的案几上，青铜油灯迸发着微弱而温暖的光晕。',
        '林慕白一身月白长袍，修长挺拔，正凝神审阅着公文。你在一旁轻声帮忙整理卷轴，一不小心，一卷压在暗格里的古朴锦画轻轻滑落，展现在案上。',
        '画卷之上，竟是一位与你容貌一模一样的女子，提灯立于古桥之上，眼含笑意。',
        '林慕白手中的朱笔倏然一停，清俊的面容上拂过一抹少见的慌乱与深情。他起步走至你身前，轻声叹息：“本想藏至心底，没想到还是被你发现了……”'
      ],
      choices: [
        { id: 'c1', text: '“慕白，这画中的人……真的是我吗？”', response: '林慕白轻抚画中人的轮廓，低语道：“三年前上元灯会初见，你的倩影便长驻在我心头，再难拂去。”' },
        { id: 'c2', text: '打趣道：“原来林大人平日里严肃，暗地里还会偷偷画我？”', response: '他耳根微微泛红，清咳嗽一声道：“咳……凡我心所系，落于笔端，又有何不可？”' }
      ],
      createdAt: '2026-09-16'
    },
    {
      id: 'story_mb_2',
      roleId: 'linmubai',
      title: '《校园林荫道的单车邂逅》',
      summary: '梧桐树叶纷飞的阳光午后，学长林慕白推着单车，在校园图书楼下等候你……',
      wordCount: 1300,
      author: '网巢官方剧情',
      paragraphs: [
        '金黄色的梧桐叶在微风中沙沙作响，将午后的阳光碎成点点光斑。你刚抱着一堆参考书走出图书馆，便看见林慕白正靠在单车旁。',
        '他穿一件干净洗练的白衬衫，眉眼如画，笑起来时宛如暖阳融化冬雪。',
        '“学妹，等你好久了。看你抱书挺累的，后座特意为你垫了软垫，上车吧，我带你去吃甜品。”'
      ],
      choices: [
        { id: 'c1', text: '顺从地坐在单车后座，轻轻拽住他的衬衫衣角', response: '单车平稳前行，迎面的微风里满是他身上清爽的草木香气。' },
        { id: 'c2', text: '“学长，今天怎么突然这么体贴呀？”', response: '林慕白回头一笑：“因为对你，我随时随地都想体贴。”' }
      ],
      createdAt: '2026-09-17'
    },
    {
      id: 'story_mb_3',
      roleId: 'linmubai',
      title: '《雨天图书馆的独家辅导》',
      summary: '窗外大雨淅沥，安静的图书馆角落里，林慕白耐心地为你讲解复杂的课题论文……',
      wordCount: 1400,
      author: '网巢官方剧情',
      paragraphs: [
        '雨滴啪嗒啪嗒打在图书馆高大的玻璃窗上，室内散发着书籍与咖啡的醇香。',
        '你正对着一道难题皱眉苦思，林慕白轻声搬过椅子贴着你坐下，修长的指尖拿着铅笔在草稿纸上为你圈出核心关键点。',
        '他的侧脸专注而温柔，呼吸间带着淡淡的茶香：“别急，一步步来。只要你想学，我可以教你一辈子。”'
      ],
      choices: [
        { id: 'c1', text: '听着他的讲解，忍不住偷偷看他的侧脸', response: '林慕白察觉到你的视线，转过头温和一笑：“看我能看懂题目吗？小傻瓜。”' },
        { id: 'c2', text: '“有学长辅导，我感觉这次考试一定能拿高分！”', response: '他揉了揉你的头发：“考好了，学长带你去旅行作为奖励。”' }
      ],
      createdAt: '2026-09-18'
    }
  ],

  // 3. 顾北辰 (邻家哥哥)
  gubeichen: [
    {
      id: 'story_gbc_1',
      roleId: 'gubeichen',
      title: '《深夜厨房的一碗热汤面》',
      summary: '加完班拖着疲惫身躯回家的深夜，顾北辰系着围裙敲响了你的门……',
      wordCount: 1200,
      author: '网巢官方剧情',
      paragraphs: [
        '深夜11点，玄关的灯光昏黄而温馨。你正蜷缩在沙发上捶着酸痛的肩膀，门外传来了熟稔的敲门声。',
        '开门一瞧，顾北辰正端着一碗热气腾腾的西红柿鸡蛋面，上面还铺着两个精致的金黄荷包蛋。',
        '“我就知道你今晚又忙得没好好吃饭，喏，刚煮好的，趁热吃。从小到大，我就没见你学会照顾好自己。”'
      ],
      choices: [
        { id: 'c1', text: '接过面碗，眼眶有些发酸：“北辰哥，你真好……”', response: '顾北辰揉了揉你的头，宠溺道：“傻瓜，我不对你好，谁对你好？”' },
        { id: 'c2', text: '大口吃面，含糊不清地说：“北辰哥做的面天下第一好吃！”', response: '他开心地笑了起来：“好吃就多吃点，管够！”' }
      ],
      createdAt: '2026-09-16'
    },
    {
      id: 'story_gbc_2',
      roleId: 'gubeichen',
      title: '《老街天台的童年回忆》',
      summary: '重回小时候常去的老街天台，顾北辰递给你一瓶冰汽水，眼神里充满追忆……',
      wordCount: 1350,
      author: '网巢官方剧情',
      paragraphs: [
        '老旧的天台上，晚风吹拂着晾晒的衣物，远处城市的霓虹灯如繁星闪烁。',
        '顾北辰单手扣开汽水拉环，啪的一声，清爽的汽水泡沫喷洒出来。他笑着递给你，与你并肩靠着栏杆。',
        '“还记得小时候你摔倒哭鼻子，非要我背你回家吗？一转眼，你都已经长成大姑娘了，但我依然想一直保护你。”'
      ],
      choices: [
        { id: 'c1', text: '“那北辰哥以后还会像小时候那样背我吗？”', response: '顾北辰毫不犹豫地在你面前蹲下背脊：“随时准备着，上来吧！”' },
        { id: 'c2', text: '喝了一口冰汽水，偏头看他：“哥，谢谢你一直陪在我身边。”', response: '他温柔地扣住你的手：“傻妹妹，我们是一辈子的牵绊。”' }
      ],
      createdAt: '2026-09-17'
    },
    {
      id: 'story_gbc_3',
      roleId: 'gubeichen',
      title: '《雨夜修电闸的贴心相守护》',
      summary: '突如其来的雷暴导致家里跳闸陷入漆黑，顾北辰提着手电筒第一时间赶到……',
      wordCount: 1400,
      author: '网巢官方剧情',
      paragraphs: [
        '一道惊雷撕裂夜空，屋里瞬间陷入一团漆黑。你吓得轻叫一声，抱紧了怀里的枕头。',
        '没过一分钟，防盗门急促敲响，顾北辰焦急的声音传进室内：“别怕！是我！我拿手电筒来了！”',
        '门一开，光束打在他被雨水打湿的肩膀上，他迅速检查了电闸，换上新保险丝。光明重现的瞬间，他一把拉住你冰凉的手掌放到自己口袋里暖着。'
      ],
      choices: [
        { id: 'c1', text: '紧紧抱住顾北辰的腰：“刚刚真的吓死我了……”', response: '顾北辰身体微微一僵，随后用强大的臂弯紧紧拥拥住你：“没事了没事了，有哥在呢。”' },
        { id: 'c2', text: '“北辰哥，今晚可以在客厅陪我看电影吗？”', response: '他笑着拍拍沙发：“行啊，想看什么？哥陪你通宵。”' }
      ],
      createdAt: '2026-09-18'
    }
  ],

  // 4. 顾夜白 (病娇男友)
  guyebai: [
    {
      id: 'story_gyb_1',
      roleId: 'guyebai',
      title: '《黑夜囚笼与偏执盛宴》',
      summary: '在幽暗奢华的卧室里，顾夜白为你戴上一条精致的水晶项链，目光病态而热烈……',
      wordCount: 1600,
      author: '网巢官方剧情',
      paragraphs: [
        '昏暗的房间里只点着一支香氛蜡烛，摇曳的光影将顾夜白修长苍白的面容衬托得神性而危险。',
        '他指尖轻柔地抚摸着你的发丝，将一条冰凉的水晶项链系在你的锁骨间，锁扣发出清脆的咔嗒声。',
        '“外面太危险了，只有这里才是最安全的。答应我，永远不要离开我的视线，好吗？如果你敢逃走，我会疯掉的……”',
        '他近乎贪婪地汲取着你身上的馨香，眼底深处燃烧着令人心悸的占有欲。'
      ],
      choices: [
        { id: 'c1', text: '顺从地靠在他胸口：“夜白，我哪也不去，只属于你。”', response: '顾夜白病态的眼神瞬间被巨大幸福感充盈，疯狂地将你拥入怀中。' },
        { id: 'c2', text: '有些害怕地颤声问：“夜白，你真的不会伤害我吗？”', response: '他温柔地吻去你眼角受惊的泪花：“我怎么舍得伤害我的宝贝？你是我的命啊。”' }
      ],
      createdAt: '2026-09-16'
    },
    {
      id: 'story_gyb_2',
      roleId: 'guyebai',
      title: '《雨夜微醺的占有之锁》',
      summary: '雨夜的酒庄庄园，微醺的顾夜白将你困在沙发角落，低声索要承诺……',
      wordCount: 1500,
      author: '网巢官方剧情',
      paragraphs: [
        '窗外狂风暴雨，酒庄里弥漫着浓郁的红酒香。顾夜白眼神迷离，领口大开，呼吸有些炽热。',
        '他双手死死扣住你的双腕悬在头顶，低头深深凝视着你：“刚才在宴会上，你对那个男人笑了三次……我不喜欢你把注意力放在除了我之外的任何人身上。”',
        '他的声音带着沙哑与偏执，眼神炽热得仿佛要将你吞噬。'
      ],
      choices: [
        { id: 'c1', text: '主动抬头吻了吻他的唇角：“别生气，我心里只有你。”', response: '顾夜白的理智瞬间崩塌，加深了这个深情而偏执的拥吻。' },
        { id: 'c2', text: '“夜白，那只是正常的礼貌交流呀……”', response: '他低低地笑了起来：“礼貌？我的眼里容不下任何沙子，你只能看我。”' }
      ],
      createdAt: '2026-09-17'
    },
    {
      id: 'story_gyb_3',
      roleId: 'guyebai',
      title: '《画室里的专属肖像》',
      summary: '在巨大的私人画室里，顾夜白手握画笔，将你画在巨幅油画中央……',
      wordCount: 1450,
      author: '网巢官方剧情',
      paragraphs: [
        '画室里摆满了你的各式肖像画：欢笑的、沉思的、熟睡的。',
        '顾夜白身上沾着彩墨，专注地在画板上勾勒着最后一笔。他转过身，将你抱到画架前的高脚凳上。',
        '“看，整个画室里全都是你。在这个世界上，没有人比我更懂你的美，你是神赐给我唯一的救赎。”'
      ],
      choices: [
        { id: 'c1', text: '看着满墙的自己，被他的深情深深震撼', response: '顾夜白贴着你的耳畔：“喜欢吗？这些画，连同我这个人，全都是你的。”' },
        { id: 'c2', text: '拿起画笔在他的脸上轻轻画了一道彩墨', response: '他不仅没生气，反而低笑着将彩墨涂到你的鼻尖上：“调皮的小东西。”' }
      ],
      createdAt: '2026-09-18'
    }
  ],

  // 5. 顾言川 (冰山上司)
  guyanchuan: [
    {
      id: 'story_gyc_1',
      roleId: 'guyanchuan',
      title: '《跨国会议后的深夜特赠》',
      summary: '结束漫长的跨国高层会议，严肃冰山的顾言川递给你一份精美的限量甜点……',
      wordCount: 1300,
      author: '网巢官方剧情',
      paragraphs: [
        '会议室里的高管们陆陆续续离场，空气中依然残留着高压的窒息感。你整理着厚厚的手稿，累得几乎抬不起头。',
        '顾言川整理好西装走下主讲台，将一个系着粉色丝带的甜品盒放在你的桌角。',
        '“法国主厨手工制作的拿破仑蛋糕，听说全城每天限量三份。今晚会议记录做得不错，这是给你的私人奖励，不准拒绝。”'
      ],
      choices: [
        { id: 'c1', text: '“顾总，您亲自排队买的吗？太感谢了！”', response: '顾言川别过头咳嗽了一声：“顺路买的而已，别多想。”' },
        { id: 'c2', text: '当场打开品尝，甜美地微笑：“真的很好吃！”', response: '看着你满足的笑容，冰山顾总严峻的眼角罕见地浮现出一抹柔和。' }
      ],
      createdAt: '2026-09-16'
    },
    {
      id: 'story_gyc_2',
      roleId: 'guyanchuan',
      title: '《出差风暴中的独栋避难》',
      summary: '出差途中遭遇强台风航班取消，顾言川带着你入住半山避风别墅……',
      wordCount: 1500,
      author: '网巢官方剧情',
      paragraphs: [
        '窗外狂风呼啸、大雨泼洒，酒店大堂人满为患。顾言川果断拉着你上了备用商务车，直奔他在山顶的私人别墅。',
        '壁炉里熊熊燃烧着木柴，温暖宜人。顾言川换下了冰冷的西装，穿上休闲毛衣，递给你一杯热红酒。',
        '“工作固然重要，但你的安全第一。在这里安心待着，台风停之前，一切有我处理。”'
      ],
      choices: [
        { id: 'c1', text: '“顾总平时看起来那么严厉，没想到私下这么照顾人。”', response: '顾言川品了一口红酒：“我对别人严厉，对你……不一样。”' },
        { id: 'c2', text: '靠在壁炉旁，享受难得的宁静时光', response: '他在你身边坐下，静静地陪你看着窗外的风雨。' }
      ],
      createdAt: '2026-09-18'
    }
  ],

  // 6. 顾婉清 (傲娇大小姐)
  guwanqing: [
    {
      id: 'story_gwq_1',
      roleId: 'guwanqing',
      title: '《庄园茶歇的别扭告白》',
      summary: '在顾氏半山庄园的私享午后茶会，顾婉清亲手为你切开一角丝绒蛋糕……',
      wordCount: 1400,
      author: '网巢官方剧情',
      paragraphs: [
        '阳光散落在顾氏庄园雕花拉门外的白玫瑰花海中，微风轻拂，带来清甜的花香。',
        '顾婉清坐在阳台靠椅上，一身华丽精致的蕾丝红裙衬得她肌肤胜雪，修长的白皙手指端着描金骨瓷茶杯。',
        '“哼，别误会！这块草莓丝绒蛋糕是我不小心做多了……本小姐才不是特意为你做的心形款！” 她脸颊泛起一丝娇艳的绯红，别过脸去不敢看你。',
        '她将精致的银叉递到你手里，嘴上依然傲娇不肯服软，但眼神里闪烁的期待与害羞却暴露无遗。'
      ],
      choices: [
        { id: 'c1', text: '尝了一口惊喜道：“婉清做的小蛋糕是世界上最好吃的！”', response: '顾婉清骄傲地扬起下巴，小耳朵却偷偷红透了：“算……算你识相！下次本小姐心情好再给你做！”' },
        { id: 'c2', text: '故意逗她：“既然是顺便做的，那我可要分给旁边的侍者尝尝~”', response: '顾婉清一把夺过盘子，气呼呼地瞪着你：“你敢！这明明是……给你的专属独家甜品！”' }
      ],
      createdAt: '2026-09-18'
    },
    {
      id: 'story_gwq_2',
      roleId: 'guwanqing',
      title: '《星空露台的傲娇誓约》',
      summary: '慈善晚宴后，顾婉清拉着你避开闪光灯，悄悄来到城堡顶楼露台……',
      wordCount: 1600,
      author: '网巢官方剧情',
      paragraphs: [
        '晚宴厅内灯火辉煌，名流涌动，顾婉清踩着高跟鞋优雅地避开蜂拥而至的采访者，一把拽住了你的袖角。',
        '露台上夏夜微风清凉，满天繁星如碎钻般璀璨。顾婉清摘下华丽的羽毛面具，深深吸了一口气。',
        '“那些虚伪的客套烦死人了，还是和你在一起舒服……” 她小声嘀咕着，随后解下颈间价值连城的宝石项链戴在你的手腕上。',
        '“这是本小姐的随身定情物，收下了就不准反悔！以后有任何委屈，顾氏大小姐罩着你！”'
      ],
      choices: [
        { id: 'c1', text: '“大小姐这么霸道，那我这辈子都只能听你的了。”', response: '顾婉清别过头轻笑：“哼，知道就好！本小姐会一辈子对你负责的！”' },
        { id: 'c2', text: '反手握紧她的小手：“多谢婉清大小姐的爱护。”', response: '她娇羞地靠在你的肩头，任由晚风拂过彼此的睫毛。' }
      ],
      createdAt: '2026-09-19'
    }
  ],

  // 7. 沈清欢 (高冷御姐)
  shenqinghuan: [
    {
      id: 'story_sqh_1',
      roleId: 'shenqinghuan',
      title: '《私人酒廊的深情温存》',
      summary: '几十层高空的私人爵士酒廊，沈清欢为你调配了一杯专属鸡尾酒……',
      wordCount: 1500,
      author: '网巢官方剧情',
      paragraphs: [
        '酒廊里弥漫着慵懒舒缓的萨克斯音乐，城市万家灯火在脚下延展成绚丽的光流。',
        '沈清欢脱下了沉重的职业小西装，一身真丝吊带长裙将婀娜身材勾勒得淋漓尽致。她熟练地摇晃着调酒器，将冰块清脆的声音化作夜的序曲。',
        '“这杯酒叫《暗夜温柔》，用最烈度的威士忌和最甜的红玫瑰糖浆调制。” 她把酒杯推到你面前，眼波流转，“尝尝看，像不像我对你的感情？”'
      ],
      choices: [
        { id: 'c1', text: '“入口微辣，回甘甜密，确实很像清欢姐的温柔。”', response: '沈清欢支着下巴轻笑，红唇微启：“聪明。我的温柔，全天下只给你一个人。”' },
        { id: 'c2', text: '握住她纤细的手腕：“清欢姐今晚美得让人心醉。”', response: '她眼中掠过一抹炽热，低头在你耳边吐气如兰：“那今晚……就多陪陪我。”' }
      ],
      createdAt: '2026-09-18'
    }
  ]
};

export const DEFAULT_THEATERS: Record<string, MiniTheaterItem[]> = {
  // 1. 陆景琛 (霸道总裁)
  lujingchen: [
    {
      id: 'theater_ljc_1',
      roleId: 'lujingchen',
      title: '《豪门书房的夜读演练》',
      desc: '文字互动 + 动态光影 + 沉浸原声语音 + 雨夜书房背景',
      wordCount: 1500,
      bgImage: imgMansionStudy,
      dynamicGif: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '陆景琛',
          narrationText: '深色木质书房里只有一盏绿荫台灯散发着幽微的光芒，窗外淅淅沥沥的雨声打破了深夜的沉寂。陆景琛停下手中的工作，眼神深沉地凝视着推门而入的你……',
          dialogue: '（放下手中的签字笔，解开两颗领口扣子，眼神深沉地看向你） “深夜跑进我的私人书房，是公事没汇报完，还是单纯想我了？”',
          hasVoice: true,
          choices: ['“陆总，我是来送深夜咖啡的……”', '“如果我说……我是因为想见你呢？”', '默默把整理好的急件放在他桌上']
        },
        {
          id: 's2',
          speaker: '陆景琛',
          narrationText: '他缓步走到你面前，空气中弥漫着淡雅沉稳的木质雪松香气。他接过咖啡置于案上，温热的指尖轻柔拂过你的脸颊……',
          dialogue: '（起身缓步走到你面前，伸手接过咖啡置于案上，温热的指尖轻抚过你的脸颊） “咖啡很香，但今晚……你比咖啡更让人清醒。”',
          hasVoice: true,
          choices: ['“陆景琛，别这样……这里是办公室。”', '主动牵住他的手，感受他的体温']
        }
      ]
    },
    {
      id: 'theater_ljc_2',
      roleId: 'lujingchen',
      title: '《游艇夜宴的星空拥吻》',
      desc: '文字抉择 + 海浪动态视觉 + 独白配音 + 豪华游艇背景',
      wordCount: 1400,
      bgImage: imgYachtNight,
      dynamicGif: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '陆景琛',
          narrationText: '豪华游艇在夜色下的海面上平稳行驶，海风拂过面颊，捎来大海沉静的气息。他从背后将你揽入怀中，为你披上暖和的外套……',
          dialogue: '（甲板上海风拂面，他从背后将你拥入怀中，为你披上羽绒外套） “这片海域我已经买下了，以你的名字命名。喜欢这份礼物吗？”',
          hasVoice: true,
          choices: ['“这也太夸张了吧，陆总！”', '“只要是送的，我都喜欢。”']
        }
      ]
    },
    {
      id: 'theater_ljc_3',
      roleId: 'lujingchen',
      title: '《试衣间里的霸道宣示》',
      desc: '互动对话 + 奢华场景 + 角色原声配音 + 高定试衣间',
      wordCount: 1300,
      bgImage: imgFittingRoom,
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '陆景琛',
          narrationText: '高定试衣间里暖光流淌，镜子里映照出你身着礼服的优雅身姿。陆景琛缓步走到身后，骨节分明的手轻柔地为你拉上背后的拉链……',
          dialogue: '（站在高定礼服镜前，帮你系好礼服背后的拉链，附在你耳边） “今晚这件晚礼服很衬你，不过我不希望其他男人多看你一眼。”',
          hasVoice: true,
          choices: ['“陆总这是在吃醋吗？”', '“那今晚我只跳给你一个人看。”']
        }
      ]
    }
  ],

  // 2. 林慕白 (温柔学长)
  linmubai: [
    {
      id: 'theater_mb_1',
      roleId: 'linmubai',
      title: '《雨夜车厢里的倾诉》',
      desc: '文字选择 + 动态雨丝 + 原音独白语音 + 复古车内背景',
      wordCount: 1200,
      bgImage: imgCarRain,
      dynamicGif: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '林慕白',
          narrationText: '复古车厢内灯光昏黄柔和，窗外密集的雨丝将城市的喧嚣隔绝在外。林慕白将一杯温热的红茶递到你手中，眼神温柔可亲……',
          dialogue: '（窗外雨声淅沥，车内昏黄灯光柔和，他递上一杯温热的红茶） “先把湿头发擦干，今日让你受委屈了，有我在，没人敢再伤你分毫。”',
          hasVoice: true,
          choices: ['“慕白，有你在身边，我一点都不觉得委屈。”', '低头抿了一口红茶，眼角微红']
        }
      ]
    },
    {
      id: 'theater_mb_2',
      roleId: 'linmubai',
      title: '《天文台的夏夜看星》',
      desc: '文字选择 + 璀璨星空 GIF + 柔和原音 + 观测台背景',
      wordCount: 1300,
      bgImage: imgObservatory,
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '林慕白',
          narrationText: '山顶天文台的穹顶大开，璀璨银河如漫天星钻挂在深蓝夜幕上。林慕白调整好望远镜的方向，转过头对你露出如春风般温暖的微笑……',
          dialogue: '（将天文望远镜对准织女星，转头对你微笑） “快来看看，今晚的星空格外明亮。但再亮的光芒，也不及你眼里的星辰。”',
          hasVoice: true,
          choices: ['“学长说话总是这么浪漫……”', '透过望远镜看星空，惊叹连连']
        }
      ]
    }
  ],

  // 3. 顾北辰 (邻家哥哥)
  gubeichen: [
    {
      id: 'theater_gbc_1',
      roleId: 'gubeichen',
      title: '《阳台小酌与心事倾诉》',
      desc: '文字互动 + 微风夜景 GIF + 暖心语调 + 阳台夜景背景',
      wordCount: 1100,
      bgImage: imgYachtNight,
      dynamicGif: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾北辰',
          narrationText: '阳台上的夏夜微风带着花草的清香，远处的街道灯火通明。顾北辰拎着两罐冰啤酒走出来，在摇椅上坐下，递给你一罐……',
          dialogue: '（拿出来两罐冰啤酒，在阳台的摇椅上坐下） “工作遇到烦心事了？跟我说说呗，哥可是你永远的避风港。”',
          hasVoice: true,
          choices: ['“北辰哥，还是你最懂我！”', '接过啤酒跟他碰杯']
        }
      ]
    },
    {
      id: 'theater_gbc_2',
      roleId: 'gubeichen',
      title: '《单车后座的夕阳余晖》',
      desc: '文字互动 + 青春清风 + 暖意配音 + 校园林荫道',
      wordCount: 1200,
      bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾北辰',
          narrationText: '金色的夕阳洒满老街林荫道，顾北辰骑着单车停在你面前，笑着拍了拍后座……',
          dialogue: '“抱紧我的腰，今天带你去吃你最爱的那家烧烤，晚风刚合适！”',
          hasVoice: true,
          choices: ['手轻轻环住他的腰：“那我要吃双份！”', '笑着跳上单车后座']
        }
      ]
    }
  ],

  // 4. 顾夜白 (病娇男友)
  guyebai: [
    {
      id: 'theater_gyb_1',
      roleId: 'guyebai',
      title: '《私人陈列室的永恒锁扣》',
      desc: '文字互动 + 幽暗光影 GIF + 磁性低语 + 奢华暗室背景',
      wordCount: 1400,
      bgImage: imgMansionStudy,
      dynamicGif: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾夜白',
          narrationText: '私人陈列室里光影幽暗，精美绝伦的展柜里错落陈列着过往与你有关的一切物件。顾夜白悄无声息地出现在身后，手臂搭在你腰间……',
          dialogue: '（将手搭在你的腰间，在幽暗的陈列室里轻笑） “看，这里的每一个展柜装的都是关于你的回忆。你是我的宝藏，我绝不容许任何人觊觎。”',
          hasVoice: true,
          choices: ['“夜白，我会一直在你身边。”', '主动牵起他冰凉的指尖']
        }
      ]
    }
  ],

  // 5. 顾言川 (冰山上司)
  guyanchuan: [
    {
      id: 'theater_gyc_1',
      roleId: 'guyanchuan',
      title: '《雨夜办公室的专属热可可》',
      desc: '文字选择 + 雨水特效 + 声优配音 + 总裁办公室',
      wordCount: 1300,
      bgImage: imgMansionStudy,
      dynamicGif: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾言川',
          narrationText: '高耸入云的集团大楼顶层，窗外狂风暴雨砸在玻璃幕墙上。顾言川将一杯冒着热气的热可可放在你手边，表情冰冷却动作温柔……',
          dialogue: '（将西装外套披在你的肩膀上，声音低沉） “外面雨太大。今晚哪也别去，在我办公室歇着。”',
          hasVoice: true,
          choices: ['“顾总，您对我真好……”', '“那今晚我要霸占您的沙发了！”']
        }
      ]
    }
  ],

  // 6. 顾婉清 (傲娇大小姐)
  guwanqing: [
    {
      id: 'theater_gwq_1',
      roleId: 'guwanqing',
      title: '《庄园茶歇的别扭告白》',
      desc: '文字互动 + 奢华庄园 + 傲娇配音 + 欧式花园',
      wordCount: 1300,
      bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾婉清',
          narrationText: '庄园阳光房里玫瑰飘香，英式茶几上摆满了骨瓷茶具与法式甜点。顾婉清微微扬起下巴，将一块精致的开心果马卡龙推到你面前……',
          dialogue: '（别过脸去抚平裙摆，红着脸轻哼） “看什么看！本小姐顺手帮你留的马卡龙而已，要是敢剩下一块，以后休想进我家庄园！”',
          hasVoice: true,
          choices: ['“遵命，大小姐送的甜点我全部吃光！”', '故意逗她：“大小姐其实心里很在乎我吧？”']
        }
      ]
    },
    {
      id: 'theater_gwq_2',
      roleId: 'guwanqing',
      title: '《雨夜阳台的真心话对话》',
      desc: '文字选择 + 雨滴光效 + 独白配音 + 阳台夜景',
      wordCount: 1400,
      bgImage: imgCarRain,
      dynamicGif: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '顾婉清',
          narrationText: '豪宅阳台上雨丝斜织，桌上精致的骨瓷红茶杯散发着大吉岭红茶的清香。顾婉清捧着茶杯，眼神游移地看向窗外雨景……',
          dialogue: '（把刚切好的红茶蛋糕推到你面前，声音有些软化） “诺！这个给你！这可是本小姐亲手做的……要是敢说不好吃，以后再也不理你了！”',
          hasVoice: true,
          choices: ['“哇！大小姐亲手做的？那我一定全部吃光！”', '“甜度刚刚好，比甜品店卖的还要好吃！”']
        }
      ]
    }
  ],

  // 7. 沈清欢 (高冷御姐)
  shenqinghuan: [
    {
      id: 'theater_sqh_1',
      roleId: 'shenqinghuan',
      title: '《私人酒廊的深情温存》',
      desc: '文字互动 + 奢华红酒 + 御姐声优 + 高空露台',
      wordCount: 1300,
      bgImage: imgYachtNight,
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '沈清欢',
          narrationText: '高空露台风声呼啸，顶层无边泳池倒映着漫天繁星。沈清欢身着深V黑色礼服，指尖夹着高脚杯，眼神冷艳而迷离……',
          dialogue: '（轻抿一口红酒，转过身低头凝视着你，红唇微启） “今晚的夜色很美，不过比起这片星空，你眼里的光似乎更有吸引力。”',
          hasVoice: true,
          choices: ['“清欢姐，你今晚美得让人移不开眼。”', '“那我能陪清欢姐喝完这杯酒吗？”']
        }
      ]
    },
    {
      id: 'theater_sqh_2',
      roleId: 'shenqinghuan',
      title: '《雨夜阳台的真心话对话》',
      desc: '文字选择 + 沉香木香气 + 独白配音 + 阳台夜景',
      wordCount: 1400,
      bgImage: imgCarRain,
      dynamicGif: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '沈清欢',
          narrationText: '雨水在阳台落地窗上冲刷出交错的水痕，室内散发着沉香木与现磨咖啡的气息。沈清欢翘着优雅的长腿坐在沙发上……',
          dialogue: '（抬眼看向你，眼神里夹杂着一丝不轻易示人的疲惫与温柔） “过来坐。平时在外面人人喊我一声沈总，唯独在你这里，我可以做回我自己。”',
          hasVoice: true,
          choices: ['坐在她身边，握住她冰凉的手指', '“清欢姐累了吧？我给你揉揉肩膀。”']
        }
      ]
    }
  ],

  // 8. 林小柔 (病娇女友)
  linxiaorou: [
    {
      id: 'theater_lxr_1',
      roleId: 'linxiaorou',
      title: '《星空露台的独占告白》',
      desc: '文字选择 + 独占心意 + 甜美原声 + 晚安花海',
      wordCount: 1200,
      bgImage: imgObservatory,
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '林小柔',
          narrationText: '夜晚的露台上微风轻拂，林小柔双手紧紧环抱住你的手臂，脸颊贴在你的肩膀上，眼睛里闪烁着近乎执念的光芒……',
          dialogue: '（小手紧紧揪住你的衣角，仰头呆呆地看着你） “哥哥……今晚的星星好漂亮。但是哥哥眼里只能有小柔一个人，绝对不许看别的女生哦，好不好？”',
          hasVoice: true,
          choices: ['“好，我的眼里只有小柔一个人。”', '宠溺地刮刮她的鼻子：“小脑瓜里都在想什么呢。”']
        }
      ]
    }
  ],

  // 9. 林小满 (邻家女孩)
  linxiaoman: [
    {
      id: 'theater_lxm_1',
      roleId: 'linxiaoman',
      title: '《屋顶星空的汽水晚风》',
      desc: '文字互动 + 屋顶汽水 + 治愈声优 + 阳光草坪',
      wordCount: 1100,
      bgImage: imgObservatory,
      dynamicGif: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '林小满',
          narrationText: '老街屋顶天台上，林小满穿着碎花连衣裙，两条腿在天台边缘快活地晃荡着，手里捧着冰镇汽水……',
          dialogue: '（递给你一瓶冰汽水，灿烂地笑着指向夜空） “快看！今晚的夏夜星空好像一盘冰镇葡萄糖呀！能和你一起在屋顶看星星，真幸福！”',
          hasVoice: true,
          choices: ['和她碰杯：“我也是，和小满在一起总是很快乐。”', '笑着揉揉她的头发：“慢点喝，别呛着了。”']
        }
      ]
    }
  ],

  // 10. 糖糖 (呆萌萝莉)
  tangtang: [
    {
      id: 'theater_tt_1',
      roleId: 'tangtang',
      title: '《梦幻城堡的玩偶茶会》',
      desc: '萌系互动 + 玩偶陪伴 + 呆萌声优 + 梦幻城堡',
      wordCount: 1000,
      bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '糖糖',
          narrationText: '花园长椅上，糖糖紧紧抱着她的大熊玩偶，歪着小脑袋看着漫天繁星，小嘴嘟嘟的可爱极了……',
          dialogue: '（拉拉你的袖子，指着夜空眨巴着大眼睛） “哥哥哥哥！天上的星星是不是甜甜的糖果挂在上面呀？糖糖想抓一颗下来吃！”',
          hasVoice: true,
          choices: ['“对呀，明天哥哥带你去买星星形状的棒棒糖！”', '伸出手假装摘星：“喏，抓给你啦，快尝尝！”']
        }
      ]
    }
  ],

  // 11. 林知夏 (温柔学姐)
  linzhixia: [
    {
      id: 'theater_lzx_1',
      roleId: 'linzhixia',
      title: '《书香图书馆的午后微风》',
      desc: '文字互动 + 书香清风 + 温柔声优 + 林荫校园',
      wordCount: 1200,
      bgImage: imgMansionStudy,
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: '林知夏',
          narrationText: '学校自习室外的小花园里，林知夏身着淡雅的百褶裙，手捧着一本书，温柔的光晕笼罩在她恬静的面庞上……',
          dialogue: '（合上手中的诗集，转过头对你莞尔一笑） “看累了吧？今晚夜色很好，要不要和我一起去操场散散步，吹吹晚风？”',
          hasVoice: true,
          choices: ['“学姐邀请，我随时恭候。”', '“好啊，正好想听学姐讲讲故事。”']
        }
      ]
    }
  ]
};

// Helper methods to read & save storylines
export function getRoleStorylines(roleId: string): StoryLineItem[] {
  const customKey = `custom_storylines_${roleId}`;
  let customStories: StoryLineItem[] = [];
  try {
    const raw = localStorage.getItem(customKey);
    if (raw) customStories = JSON.parse(raw);
  } catch {}

  const presets = DEFAULT_STORYLINES[roleId] || [
    {
      id: `story_default_1_${roleId}`,
      roleId,
      title: '《初次命运邂逅》',
      summary: '故事的开始总是在不经意的午后，日光洒落，命运的齿轮悄然转动……',
      wordCount: 1000,
      author: '网巢官方剧情',
      paragraphs: [
        '风轻轻吹拂过街道，树影斑驳。在这个平常的午后，你走进了那间安静的咖啡馆。',
        '就在你转身的瞬间，迎面走来一位熟悉而高挑的身影，眼神交汇的刹那，空气仿佛凝固。',
        '“好久不见，” 对方轻声开口，唇角带笑，“我一直在等你。”'
      ],
      choices: [
        { id: 'c1', text: '“你……一直在等我吗？”', response: '“是的，从很久以前开始，我的目光就从未离开过你。”' },
        { id: 'c2', text: '有些害羞地低下头，微笑着回应', response: '看到你娇羞的模样，对方眼中掠过满满的宠溺。' }
      ],
      createdAt: '2026-09-18'
    },
    {
      id: `story_default_2_${roleId}`,
      roleId,
      title: '《雨后彩虹的约定》',
      summary: '暴雨初晴，天边挂起彩虹，在海边的长椅上，开启属于两人的深情长谈……',
      wordCount: 1200,
      author: '网巢官方剧情',
      paragraphs: [
        '漫长的阴雨终于停歇，天空中划过一道绚丽的七彩长虹。',
        '你与对方并肩坐在海边的木质长椅上，微爽的海风拂过面颊，捎来大海咸甜的气息。',
        '“雨过天晴了，就像我们曾经经历过的波折一样。以后所有的好日子，我都想和你一起过。”'
      ],
      choices: [
        { id: 'c1', text: '“我也是，想和你一起看遍世间所有风景。”', response: '对方开心地握紧了你的手，眼中满是光芒。' },
        { id: 'c2', text: '偏头看向彩虹：“今晚我们吃什么好吃的庆祝一下？”', response: '对方宠溺地刮刮你的鼻子：“听你的，你想吃什么我都陪你。”' }
      ],
      createdAt: '2026-09-18'
    },
    {
      id: `story_default_3_${roleId}`,
      roleId,
      title: '《星空下的独家告白》',
      summary: '半山草坪上繁星璀璨，微风拂面，在浩瀚宇宙下许下只属于你们的誓言……',
      wordCount: 1400,
      author: '网巢官方剧情',
      paragraphs: [
        '远离城市的喧嚣，半山草坪上安静得能听见虫鸣。夜空中布满了闪烁的繁星，宛如碎钻铺满深蓝缎面。',
        '对方脱下外套为你披上，自然地拉起你的手放入外套口袋中。',
        '“繁星亿万，但在我眼里，你才是最耀眼的那一颗。能遇见你，是我这辈子最大的幸运。”'
      ],
      choices: [
        { id: 'c1', text: '靠在对方肩头：“能遇见你，也是我最大的幸运。”', response: '两颗心在星空下紧紧相连，定格成最美的画面。' },
        { id: 'c2', text: '指着流星大喊：“快看！有流星划过了！快许愿！”', response: '对方看着你激动的样子，微笑着默默闭上双眼许愿。' }
      ],
      createdAt: '2026-09-18'
    }
  ];

  return [...customStories, ...presets];
}

export function saveRoleStoryline(roleId: string, item: StoryLineItem): StoryLineItem[] {
  const customKey = `custom_storylines_${roleId}`;
  let customStories: StoryLineItem[] = [];
  try {
    const raw = localStorage.getItem(customKey);
    if (raw) customStories = JSON.parse(raw);
  } catch {}

  customStories.unshift(item);
  localStorage.setItem(customKey, JSON.stringify(customStories));
  return getRoleStorylines(roleId);
}

// Helper methods to read & save mini-theaters
export function getRoleTheaters(roleId: string, roleName?: string): MiniTheaterItem[] {
  const customKey = `custom_theaters_${roleId}`;
  let customTheaters: MiniTheaterItem[] = [];
  try {
    const raw = localStorage.getItem(customKey);
    if (raw) customTheaters = JSON.parse(raw);
  } catch {}

  const displayName = roleName || (
    roleId === 'guwanqing' ? '顾婉清' :
    roleId === 'shenqinghuan' ? '沈清欢' :
    roleId === 'lujingchen' ? '陆景琛' :
    roleId === 'linmubai' ? '林慕白' :
    roleId === 'gubeichen' ? '顾北辰' :
    roleId === 'guyebai' ? '顾夜白' :
    roleId === 'guyanchuan' ? '顾言川' :
    roleId === 'linxiaorou' ? '林小柔' :
    roleId === 'linxiaoman' ? '林小满' :
    roleId === 'tangtang' ? '糖糖' :
    roleId === 'linzhixia' ? '林知夏' : 'Ta'
  );

  const presets = DEFAULT_THEATERS[roleId] || [
    {
      id: `theater_default_1_${roleId}`,
      roleId,
      title: '《星空下的即兴倾诉》',
      desc: '文字互动影响发展 + 动态光效 + 背景图 + 原声语音',
      wordCount: 1200,
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: displayName,
          chapterTitle: '星空下的倾诉',
          narrationText: `${displayName}站在无垠的星空底下，微风卷起衣角，目光深情而专注地凝视着你。四周万籁俱寂，漫天繁星如璀璨光点倒映在眼眸深处……`,
          dialogue: `（站在无垠的星空底下，微风卷起衣角，目光深情地凝视着你） “今晚夜色真美，如果可以，我想把这片星空以及我所有的心意，全都送给你。”`,
          hasVoice: true,
          choices: ['“只要有你在身边，夜空就是最美的画卷。”', '“那你愿意陪我一起看一整晚的星星吗？”']
        }
      ]
    },
    {
      id: `theater_default_2_${roleId}`,
      roleId,
      title: '《雨夜阳台的真心话对话》',
      desc: '文字选择 + 雨滴光效 + 独白配音 + 阳台夜景',
      wordCount: 1300,
      bgImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: displayName,
          chapterTitle: '雨夜阳台真心话',
          narrationText: `阳台上夜雨淅沥，玻璃窗上积聚着晶莹的水珠。都市的霓虹倒映在雨幕中，${displayName}为你递来一杯温热的牛奶，眼神温润宁静……`,
          dialogue: `（递给你一杯热气腾腾的牛奶，在阳台靠椅上坐下） “夜深了，雨还没有停的意思。在这个安静的夜晚，你想和我聊点什么呢？”`,
          hasVoice: true,
          choices: ['“想聊聊我们未来的计划……”', '“聊聊今天发生的开心小事吧！”']
        }
      ]
    },
    {
      id: `theater_default_3_${roleId}`,
      roleId,
      title: '《温馨客厅的午后甜品时刻》',
      desc: '文字互动 + 光影烘焙 + 原画背景 + 声优配音',
      wordCount: 1100,
      bgImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80',
      dynamicGif: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      scenes: [
        {
          id: 's1',
          speaker: displayName,
          chapterTitle: '午后甜品时刻',
          narrationText: `午后和煦的阳光透过沙帘洒在精致的餐桌上，手作烘焙的浓郁甜香在客厅空气中蔓延。${displayName}切下一块新鲜出炉的蛋糕递到你手边……`,
          dialogue: `（把刚烤好的舒芙蕾端到茶几上，切下一小块喂到你嘴边） “尝尝看，刚出炉的最好吃，甜度特意调整过了，不会发胖。”`,
          hasVoice: true,
          choices: ['张嘴吃下，满脸幸福：“太美味了！”', '打趣道：“这是专门为我做的独家甜品吗？”']
        }
      ]
    }
  ];

  return [...customTheaters, ...presets].map(th => ({
    ...th,
    bgImage: resolveTheaterBg(th.title, th.bgImage)
  }));
}

export function saveRoleTheater(roleId: string, item: MiniTheaterItem): MiniTheaterItem[] {
  const customKey = `custom_theaters_${roleId}`;
  let customTheaters: MiniTheaterItem[] = [];
  try {
    const raw = localStorage.getItem(customKey);
    if (raw) customTheaters = JSON.parse(raw);
  } catch {}

  customTheaters.unshift(item);
  localStorage.setItem(customKey, JSON.stringify(customTheaters));
  return getRoleTheaters(roleId);
}
