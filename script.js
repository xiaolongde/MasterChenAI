// 增删卜易地支配置表（按八宫排列）
const zengShanBuYiConfig = {
    // 乾宫地支序列（金宫）
    '乾宫': {
        wuxing: '金',
        dizhi: ['子', '寅', '辰', '午', '申', '戌'] // 从初爻到上爻
    },
    // 兑宫地支序列（金宫）  
    '兑宫': {
        wuxing: '金',
        dizhi: ['巳', '卯', '丑', '亥', '酉', '未'] // 从初爻到上爻
    },
    // 离宫地支序列（火宫）
    '离宫': {
        wuxing: '火', 
        dizhi: ['卯', '丑', '亥', '酉', '未', '巳'] // 从初爻到上爻
    },
    // 震宫地支序列（木宫）
    '震宫': {
        wuxing: '木',
        dizhi: ['子', '寅', '辰', '午', '申', '戌'] // 从初爻到上爻
    },
    // 巽宫地支序列（木宫）
    '巽宫': {
        wuxing: '木',
        dizhi: ['丑', '亥', '酉', '未', '巳', '卯'] // 从初爻到上爻
    },
    // 坎宫地支序列（水宫）
    '坎宫': {
        wuxing: '水',
        dizhi: ['寅', '辰', '午', '申', '戌', '子'] // 从初爻到上爻
    },
    // 艮宫地支序列（土宫）
    '艮宫': {
        wuxing: '土',
        dizhi: ['辰', '午', '申', '戌', '子', '寅'] // 从初爻到上爻
    },
    // 坤宫地支序列（土宫）
    '坤宫': {
        wuxing: '土',
        dizhi: ['未', '巳', '卯', '丑', '亥', '酉'] // 从初爻到上爻
    }
};

// 地支对应五行表
const dizhiWuxingMap = {
    '子': '水', '亥': '水',
    '寅': '木', '卯': '木', 
    '巳': '火', '午': '火',
    '申': '金', '酉': '金',
    '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 根据宫位获取正确的地支和五行配置
function getCorrectGuaConfig(palace) {
    const config = zengShanBuYiConfig[palace];
    if (!config) return null;
    
    // 根据地支计算五行
    const wuxingYao = config.dizhi.map(dizhi => dizhiWuxingMap[dizhi]);
    
    return {
        palace: palace,
        wuxing: config.wuxing,
        dizhi: config.dizhi,
        wuxingYao: wuxingYao
    };
}

// 动态修正卦象配置
function getCorrectGuaInfo(guaCode, originalGuaInfo) {
    if (!originalGuaInfo || !originalGuaInfo.palace) return originalGuaInfo;
    
    const correctConfig = getCorrectGuaConfig(originalGuaInfo.palace);
    if (!correctConfig) return originalGuaInfo;
    
    // 返回修正后的卦象信息
    return {
        ...originalGuaInfo,
        wuxing: correctConfig.wuxing,
        dizhi: correctConfig.dizhi,
        wuxingYao: correctConfig.wuxingYao,
        get liuqin() { return calculateAllLiuqin(this.wuxing, this.wuxingYao); }
    };
}

// 根据宫的五行和爻的五行计算六亲
function calculateLiuqin(palaceWuxing, yaoWuxing) {
    // 五行相生关系：key生value
    const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
    // 反向相生：key被value生
    const beiSheng = { '火': '木', '土': '火', '金': '土', '水': '金', '木': '水' };
    // 五行相克关系：key克value
    const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
    // 反向相克：key被value克
    const beiKe = { '土': '木', '水': '土', '火': '水', '金': '火', '木': '金' };
    
    if (yaoWuxing === palaceWuxing) {
        return '兄弟'; // 同我者为兄弟
    } else if (beiSheng[palaceWuxing] === yaoWuxing) {
        return '父母'; // 生我者为父母
    } else if (sheng[palaceWuxing] === yaoWuxing) {
        return '子孙'; // 我生者为子孙
    } else if (beiKe[palaceWuxing] === yaoWuxing) {
        return '官鬼'; // 克我者为官鬼
    } else if (ke[palaceWuxing] === yaoWuxing) {
        return '妻财'; // 我克者为妻财
    }
    return '未知';
}

// 自动计算六亲数组
function calculateAllLiuqin(palaceWuxing, wuxingYaoArray) {
    return wuxingYaoArray.map(yaoWuxing => calculateLiuqin(palaceWuxing, yaoWuxing));
}

// 卦象数据（64卦基础信息）
const guaData = {
    // 乾宫八卦（金）
    // 乾宫属金：父母=土，子孙=水，官鬼=火，妻财=木，兄弟=金
    '111111': { 
        name: '乾为天', 
        info: '乾：元，亨，利，贞。',
        palace: '乾宫',
        wuxing: '金',
        shi: 6,
        ying: 3,
        liuqin: ['子孙', '妻财', '父母', '官鬼', '兄弟', '父母'],
        dizhi: ['子', '寅', '辰', '午', '申', '戌'],
        wuxingYao: ['水', '木', '土', '火', '金', '土']
    },
    '011111': { 
        name: '天风姤', 
        info: '姤：女壮，勿用取女。',
        palace: '乾宫',
        wuxing: '金',
        shi: 1,
        ying: 4,
        liuqin: ['父母', '子孙', '兄弟', '官鬼', '兄弟', '父母'],
        dizhi: ['丑', '亥', '酉', '午', '申', '戌'],
        wuxingYao: ['土', '水', '金', '火', '金', '土']
    },
    '001111': { 
        name: '天山遁', 
        info: '遁：亨，小利贞。',
        palace: '乾宫',
        wuxing: '金',
        shi: 2,
        ying: 5,
        liuqin: ['父母', '官鬼', '兄弟', '官鬼', '兄弟', '父母'],
        dizhi: ['辰', '午', '申', '午', '申', '戌'],
        wuxingYao: ['土', '火', '金', '火', '金', '土']
    },
    '000111': { 
        name: '天地否', 
        info: '否：否之匪人，不利君子贞，大往小来。',
        palace: '乾宫',
        wuxing: '金',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '官鬼', '妻财', '官鬼', '兄弟', '父母'],
        dizhi: ['未', '巳', '卯', '午', '申', '戌'],
        wuxingYao: ['土', '火', '木', '火', '金', '土']
    },
    '000011': { 
        name: '风地观', 
        info: '观：盥而不荐，有孚颙若。',
        palace: '乾宫',
        wuxing: '金',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '官鬼', '妻财', '父母', '官鬼', '妻财'],
        dizhi: ['未', '巳', '卯', '未', '巳', '卯'],
        wuxingYao: ['土', '火', '木', '土', '火', '木']
    },
    '000001': { 
        name: '山地剥', 
        info: '剥：不利有攸往。',
        palace: '乾宫',
        wuxing: '金',
        shi: 5,
        ying: 2,
        liuqin: ['父母', '官鬼', '妻财', '父母', '子孙', '妻财'],
        dizhi: ['未', '巳', '卯', '戌', '子', '寅'],
        wuxingYao: ['土', '火', '木', '土', '水', '木']
    },
    '000101': { 
        name: '火地晋', 
        info: '晋：康侯用锡马蕃庶，昼日三接。',
        palace: '乾宫',
        wuxing: '金',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '官鬼', '妻财', '兄弟', '父母', '官鬼'],
        dizhi: ['未', '巳', '卯', '酉', '未', '巳'],
        wuxingYao: ['土', '火', '木', '金', '土', '火']
    },
    '111101': { 
        name: '火天大有', 
        info: '大有：元亨。',
        palace: '乾宫',
        wuxing: '金',
        shi: 3,
        ying: 6,
        liuqin: ['子孙', '妻财', '父母', '兄弟', '父母', '官鬼'],
        dizhi: ['子', '寅', '辰', '酉', '未', '巳'],
        wuxingYao: ['水', '木', '土', '金', '土', '火']
    },
    
    // 兑宫八卦
    '110110': { 
        name: '兑为泽', 
        info: '兑：亨，利贞。',
        palace: '兑宫',
        wuxing: '金',
        shi: 6,
        ying: 3,
        liuqin: ['官鬼', '妻财', '父母', '子孙', '兄弟', '父母'],
        dizhi: ['巳', '卯', '丑', '亥', '酉', '未'],
        wuxingYao: ['火', '木', '土', '水', '金', '土']
    },
    '010110': { 
        name: '泽水困', 
        info: '困：亨，贞，大人吉，无咎，有言不信。',
        palace: '兑宫',
        wuxing: '金',
        shi: 1,
        ying: 4,
        liuqin: ['妻财', '父母', '官鬼', '子孙', '兄弟', '父母'],
        dizhi: ['卯', '辰', '午', '亥', '酉', '未'],
        wuxingYao: ['木', '土', '火', '水', '金', '土']
    },
    '000110': { 
        name: '泽地萃', 
        info: '萃：亨。王假有庙，利见大人，亨，利贞。',
        palace: '兑宫',
        wuxing: '金',
        shi: 2,
        ying: 5,
        liuqin: ['父母', '官鬼', '妻财', '子孙', '兄弟', '父母'],
        dizhi: ['未', '巳', '卯', '亥', '酉', '未'],
        wuxingYao: ['土', '火', '木', '水', '金', '土']
    },
    '001110': { 
        name: '泽山咸', 
        info: '咸：亨，利贞，取女吉。',
        palace: '兑宫',
        wuxing: '金',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '官鬼', '兄弟', '子孙', '兄弟', '父母'],
        dizhi: ['辰', '午', '申', '亥', '酉', '未'],
        wuxingYao: ['土', '火', '金', '水', '金', '土']
    },
    '001010': { 
        name: '水山蹇', 
        info: '蹇：利西南，不利东北；利见大人，贞吉。',
        palace: '兑宫',
        wuxing: '金',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '官鬼', '兄弟', '兄弟', '父母', '子孙'],
        dizhi: ['辰', '午', '申', '申', '戌', '子'],
        wuxingYao: ['土', '火', '金', '金', '土', '水']
    },
    '001000': { 
        name: '地山谦', 
        info: '谦：亨，君子有终。',
        palace: '兑宫',
        wuxing: '金',
        shi: 5,
        ying: 2,
        liuqin: ['父母', '官鬼', '兄弟', '父母', '子孙', '兄弟'],
        dizhi: ['辰', '午', '申', '丑', '亥', '酉'],
        wuxingYao: ['土', '火', '金', '土', '水', '金']
    },
    '001100': { 
        name: '雷山小过', 
        info: '小过：亨，利贞，可小事，不可大事。',
        palace: '兑宫',
        wuxing: '金',
        shi: 3,
        ying: 1,
        liuqin: ['父母', '官鬼', '兄弟', '官鬼', '兄弟', '父母'],
        dizhi: ['辰', '午', '申', '午', '申', '戌'],
        wuxingYao: ['土', '火', '金', '火', '金', '土']
    },
    '110100': { 
        name: '雷泽归妹', 
        info: '归妹：征凶，无攸利。',
        palace: '兑宫',
        wuxing: '金',
        shi: 3,
        ying: 6,
        liuqin: ['官鬼', '妻财', '父母', '官鬼', '兄弟', '父母'],
        dizhi: ['巳', '卯', '丑', '午', '申', '戌'],
        wuxingYao: ['火', '木', '土', '火', '金', '土']
    },
    
    // 离宫八卦
    '101101': { 
        name: '离为火', 
        info: '离：利贞，亨。畜牝牛，吉。',
        palace: '离宫',
        wuxing: '火',
        shi: 6,
        ying: 3,
        liuqin: ['父母', '子孙', '官鬼', '妻财', '子孙', '兄弟'],
        dizhi: ['卯', '丑', '亥', '酉', '未', '巳'],
        wuxingYao: ['木', '土', '水', '金', '土', '火']
    },
    '001101': { 
        name: '火山旅', 
        info: '旅：小亨，旅贞吉。',
        palace: '离宫',
        wuxing: '火',
        shi: 1,
        ying: 4,
        liuqin: ['子孙', '兄弟', '妻财', '妻财', '子孙', '兄弟'],
        dizhi: ['辰', '午', '申', '酉', '未', '巳'],
        wuxingYao: ['土', '火', '金', '金', '土', '火']
    },
    '011101': { 
        name: '火风鼎', 
        info: '鼎：元吉，亨。',
        palace: '离宫',
        wuxing: '火',
        shi: 2,
        ying: 5,
        liuqin: ['子孙', '官鬼', '妻财', '妻财', '子孙', '兄弟'],
        dizhi: ['丑', '亥', '酉', '酉', '未', '巳'],
        wuxingYao: ['土', '水', '金', '金', '土', '火']
    },
    '010101': { 
        name: '火水未济', 
        info: '未济：亨，小狐汔济，濡其尾，无攸利。',
        palace: '离宫',
        wuxing: '火',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '子孙', '兄弟', '妻财', '子孙', '兄弟'],
        dizhi: ['寅', '辰', '午', '酉', '未', '巳'],
        wuxingYao: ['木', '土', '火', '金', '土', '火']
    },
    '010001': { 
        name: '山水蒙', 
        info: '蒙：亨。匪我求童蒙，童蒙求我。',
        palace: '离宫',
        wuxing: '火',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '子孙', '兄弟', '子孙', '官鬼', '父母'],
        dizhi: ['寅', '辰', '午', '戌', '子', '寅'],
        wuxingYao: ['木', '土', '火', '土', '水', '木']
    },
    '010011': { 
        name: '风水涣', 
        info: '涣：亨。王假有庙，利涉大川，利贞。',
        palace: '离宫',
        wuxing: '火',
        shi: 5,
        ying: 2,
        liuqin: ['父母', '子孙', '兄弟', '子孙', '兄弟', '父母'],
        dizhi: ['寅', '辰', '午', '未', '巳', '卯'],
        wuxingYao: ['木', '土', '火', '土', '火', '木']
    },
    '010111': { 
        name: '天水讼', 
        info: '讼：有孚，窒惕，中吉。终凶。利见大人，不利涉大川。',
        palace: '离宫',
        wuxing: '火',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '子孙', '兄弟', '兄弟', '妻财', '子孙'],
        dizhi: ['寅', '辰', '午', '午', '申', '戌'],
        wuxingYao: ['木', '土', '火', '火', '金', '土']
    },
    '101111': { 
        name: '天火同人', 
        info: '同人：同人于野，亨。利涉大川，利君子贞。',
        palace: '离宫',
        wuxing: '火',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '子孙', '兄弟', '子孙', '父母', '子孙'],
        dizhi: ['寅', '辰', '午', '未', '巳', '戌'],
        wuxingYao: ['木', '土', '火', '土', '火', '土']
    },
    
    // 震宫八卦
    '100100': { 
        name: '震为雷', 
        info: '震：亨。震来虩虩，笑言哑哑。',
        palace: '震宫',
        wuxing: '木',
        shi: 6,
        ying: 3,
        liuqin: ['父母', '兄弟', '妻财', '子孙', '官鬼', '妻财'],
        dizhi: ['子', '寅', '辰', '午', '申', '戌'],
        wuxingYao: ['水', '木', '土', '火', '金', '土']
    },
    '000100': { 
        name: '雷地豫', 
        info: '豫：利建侯行师。',
        palace: '震宫',
        wuxing: '木',
        shi: 1,
        ying: 4,
        liuqin: ['妻财', '子孙', '兄弟', '子孙', '官鬼', '妻财'],
        dizhi: ['未', '巳', '卯', '午', '申', '戌'],
        wuxingYao: ['土', '火', '木', '火', '金', '土']
    },
    '010100': { 
        name: '雷水解', 
        info: '解：利西南，无所往，其来复吉。',
        palace: '震宫',
        wuxing: '木',
        shi: 2,
        ying: 5,
        liuqin: ['兄弟', '妻财', '子孙', '子孙', '官鬼', '妻财'],
        dizhi: ['寅', '辰', '午', '午', '申', '戌'],
        wuxingYao: ['木', '土', '火', '火', '金', '土']
    },
    '011100': { 
        name: '雷风恒', 
        info: '恒：亨，无咎，利贞，利有攸往。',
        palace: '震宫',
        wuxing: '木',
        shi: 3,
        ying: 6,
        liuqin: ['妻财', '父母', '官鬼', '子孙', '官鬼', '妻财'],
        dizhi: ['丑', '亥', '酉', '午', '申', '戌'],
        wuxingYao: ['土', '水', '金', '火', '金', '土']
    },
    '011000': { 
        name: '地风升', 
        info: '升：元亨，用见大人，勿恤，南征吉。',
        palace: '震宫',
        wuxing: '木',
        shi: 4,
        ying: 1,
        liuqin: ['妻财', '父母', '官鬼', '妻财', '父母', '官鬼'],
        dizhi: ['丑', '亥', '酉', '丑', '亥', '酉'],
        wuxingYao: ['土', '水', '金', '土', '水', '金']
    },
    '011010': { 
        name: '水风井', 
        info: '井：改邑不改井，无丧无得，往来井井。',
        palace: '震宫',
        wuxing: '木',
        shi: 5,
        ying: 2,
        liuqin: ['妻财', '父母', '官鬼', '官鬼', '妻财', '父母'],
        dizhi: ['丑', '亥', '酉', '申', '戌', '子'],
        wuxingYao: ['土', '水', '金', '金', '土', '水']
    },
    '011110': { 
        name: '泽风大过', 
        info: '大过：栋桡，利有攸往，亨。',
        palace: '震宫',
        wuxing: '木',
        shi: 4,
        ying: 1,
        liuqin: ['妻财', '父母', '官鬼', '父母', '官鬼', '妻财'],
        dizhi: ['丑', '亥', '酉', '亥', '酉', '未'],
        wuxingYao: ['土', '水', '金', '水', '金', '土']
    },
    '100110': { 
        name: '泽雷随', 
        info: '随：元亨，利贞，无咎。',
        palace: '震宫',
        wuxing: '木',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '兄弟', '妻财', '父母', '官鬼', '妻财'],
        dizhi: ['子', '寅', '辰', '亥', '酉', '未'],
        wuxingYao: ['水', '木', '土', '水', '金', '土']
    },
    
    // 巽宫八卦
    '011011': { 
        name: '巽为风', 
        info: '巽：小亨，利有攸往，利见大人。',
        palace: '巽宫',
        wuxing: '木',
        shi: 6,
        ying: 3,
        liuqin: ['妻财', '父母', '官鬼', '妻财', '子孙', '兄弟'],
        dizhi: ['丑', '亥', '酉', '未', '巳', '卯'],
        wuxingYao: ['土', '水', '金', '土', '火', '木']
    },
    '111011': { 
        name: '风天小畜', 
        info: '小畜：亨。密云不雨，自我西郊。',
        palace: '巽宫',
        wuxing: '木',
        shi: 1,
        ying: 4,
        liuqin: ['父母', '兄弟', '妻财', '妻财', '子孙', '兄弟'],
        dizhi: ['子', '寅', '辰', '未', '巳', '卯'],
        wuxingYao: ['水', '木', '土', '土', '火', '木']
    },
    '101011': { 
        name: '风火家人', 
        info: '家人：利女贞。',
        palace: '巽宫',
        wuxing: '木',
        shi: 2,
        ying: 5,
        liuqin: ['兄弟', '妻财', '父母', '妻财', '子孙', '兄弟'],
        dizhi: ['卯', '丑', '亥', '未', '巳', '卯'],
        wuxingYao: ['木', '土', '水', '土', '火', '木']
    },
    '100011': { 
        name: '风雷益', 
        info: '益：利有攸往，利涉大川。',
        palace: '巽宫',
        wuxing: '木',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '兄弟', '妻财', '妻财', '子孙', '兄弟'],
        dizhi: ['子', '寅', '辰', '未', '巳', '卯'],
        wuxingYao: ['水', '木', '土', '土', '火', '木']
    },
    '100111': { 
        name: '天雷无妄', 
        info: '无妄：元，亨，利，贞。其匪正有眚，不利有攸往。',
        palace: '巽宫',
        wuxing: '木',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '兄弟', '妻财', '子孙', '官鬼', '妻财'],
        dizhi: ['子', '寅', '辰', '午', '申', '戌'],
        wuxingYao: ['水', '木', '土', '火', '金', '土']
    },
    '100101': { 
        name: '火雷噬嗑', 
        info: '噬嗑：亨。利用狱。',
        palace: '巽宫',
        wuxing: '木',
        shi: 5,
        ying: 2,
        liuqin: ['父母', '兄弟', '妻财', '官鬼', '妻财', '子孙'],
        dizhi: ['子', '寅', '辰', '酉', '未', '巳'],
        wuxingYao: ['水', '木', '土', '金', '土', '火']
    },
    '100001': { 
        name: '山雷颐', 
        info: '颐：贞吉。观颐，自求口实。',
        palace: '巽宫',
        wuxing: '木',
        shi: 3,
        ying: 1,
        liuqin: ['父母', '兄弟', '妻财', '妻财', '父母', '兄弟'],
        dizhi: ['子', '寅', '辰', '戌', '子', '寅'],
        wuxingYao: ['水', '木', '土', '土', '水', '木']
    },
    '011001': { 
        name: '山风蛊', 
        info: '蛊：元亨，利涉大川。先甲三日，后甲三日。',
        palace: '巽宫',
        wuxing: '木',
        shi: 3,
        ying: 6,
        liuqin: ['妻财', '父母', '官鬼', '妻财', '父母', '兄弟'],
        dizhi: ['丑', '亥', '酉', '戌', '子', '寅'],
        wuxingYao: ['土', '水', '金', '土', '水', '木']
    },

    
    // 坎宫八卦
    '010010': { 
        name: '坎为水', 
        info: '坎：习坎，有孚，维心亨，行有尚。',
        palace: '坎宫',
        wuxing: '水',
        shi: 6,
        ying: 3,
        liuqin: ['子孙', '官鬼', '妻财', '父母', '官鬼', '兄弟'],
        dizhi: ['寅', '辰', '午', '申', '戌', '子'],
        wuxingYao: ['木', '土', '火', '金', '土', '水']
    },
    '110101': { 
        name: '水泽节', 
        info: '节：亨。苦节不可贞。',
        palace: '坎宫',
        wuxing: '水',
        shi: 1,
        ying: 4,
        liuqin: ['妻财', '子孙', '官鬼', '父母', '官鬼', '兄弟'],
        dizhi: ['巳', '卯', '丑', '申', '戌', '子'],
        wuxingYao: ['火', '木', '土', '金', '土', '水']
    },
    '100010': { 
        name: '水雷屯', 
        info: '屯：元，亨，利，贞，勿用，有攸往，利建侯。',
        palace: '坎宫',
        wuxing: '水',
        shi: 2,
        ying: 5,
        liuqin: ['兄弟', '子孙', '官鬼', '父母', '官鬼', '兄弟'],
        dizhi: ['子', '寅', '辰', '申', '戌', '子'],
        wuxingYao: ['水', '木', '土', '金', '土', '水']
    },
    '101010': { 
        name: '水火既济', 
        info: '既济：亨，小利贞，初吉终乱。',
        palace: '坎宫',
        wuxing: '水',
        shi: 3,
        ying: 6,
        liuqin: ['子孙', '官鬼', '兄弟', '父母', '官鬼', '兄弟'],
        dizhi: ['卯', '丑', '亥', '申', '戌', '子'],
        wuxingYao: ['木', '土', '水', '金', '土', '水']
    },
    '101110': { 
        name: '泽火革', 
        info: '革：己日乃孚。元亨，利贞，悔亡。',
        palace: '坎宫',
        wuxing: '水',
        shi: 4,
        ying: 1,
        liuqin: ['子孙', '官鬼', '兄弟', '兄弟', '父母', '官鬼'],
        dizhi: ['卯', '丑', '亥', '亥', '酉', '未'],
        wuxingYao: ['木', '土', '水', '水', '金', '土']
    },
    '101100': { 
        name: '雷火丰', 
        info: '丰：亨。王假之，勿忧，宜日中。',
        palace: '坎宫',
        wuxing: '水',
        shi: 5,
        ying: 2,
        liuqin: ['子孙', '官鬼', '兄弟', '妻财', '父母', '官鬼'],
        dizhi: ['卯', '丑', '亥', '午', '申', '戌'],
        wuxingYao: ['木', '土', '水', '火', '金', '土']
    },
    '101000': { 
        name: '地火明夷', 
        info: '明夷：利艰贞。',
        palace: '坎宫',
        wuxing: '水',
        shi: 4,
        ying: 1,
        liuqin: ['子孙', '官鬼', '兄弟', '兄弟', '兄弟', '父母'],
        dizhi: ['卯', '丑', '亥', '丑', '亥', '酉'],
        wuxingYao: ['木', '土', '水', '土', '水', '金']
    },
    '010000': { 
        name: '地水师', 
        info: '师：贞，丈人，吉无咎。',
        palace: '坎宫',
        wuxing: '水',
        shi: 3,
        ying: 6,
        liuqin: ['子孙', '官鬼', '妻财', '官鬼', '兄弟', '父母'],
        dizhi: ['寅', '辰', '午', '丑', '亥', '酉'],
        wuxingYao: ['木', '土', '火', '土', '水', '金']
    },
    
    // 艮宫八卦
    '001001': { 
        name: '艮为山', 
        info: '艮：艮其背，不获其身，行其庭，不见其人，无咎。',
        palace: '艮宫',
        wuxing: '土',
        shi: 6,
        ying: 3,
        liuqin: ['父母', '兄弟', '子孙', '妻财', '官鬼', '父母'],
        dizhi: ['辰', '午', '申', '戌', '子', '寅'],
        wuxingYao: ['土', '火', '金', '土', '水', '木']
    },
    '101001': { 
        name: '山火贲', 
        info: '贲：亨。小利有攸往。',
        palace: '艮宫',
        wuxing: '土',
        shi: 1,
        ying: 4,
        liuqin: ['父母', '兄弟', '子孙', '妻财', '官鬼', '父母'],
        dizhi: ['卯', '丑', '亥', '戌', '子', '寅'],
        wuxingYao: ['木', '土', '水', '土', '水', '木']
    },
    '111001': { 
        name: '山天大畜', 
        info: '大畜：利贞，不家食吉，利涉大川。',
        palace: '艮宫',
        wuxing: '土',
        shi: 2,
        ying: 5,
        liuqin: ['父母', '父母', '兄弟', '子孙', '妻财', '官鬼'],
        dizhi: ['子', '寅', '辰', '戌', '子', '寅'],
        wuxingYao: ['水', '木', '土', '土', '水', '木']
    },
    '110001': { 
        name: '山泽损', 
        info: '损：有孚，元吉，无咎，可贞，利有攸往。',
        palace: '艮宫',
        wuxing: '土',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '父母', '父母', '兄弟', '子孙', '妻财'],
        dizhi: ['巳', '卯', '丑', '戌', '子', '寅'],
        wuxingYao: ['火', '木', '土', '土', '水', '木']
    },
    '110101': { 
        name: '火泽睽', 
        info: '睽：小事吉。',
        palace: '艮宫',
        wuxing: '土',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '父母', '父母', '父母', '兄弟', '子孙'],
        dizhi: ['巳', '卯', '丑', '酉', '未', '巳'],
        wuxingYao: ['火', '木', '土', '金', '土', '火']
    },
    '110111': { 
        name: '天泽履', 
        info: '履：履虎尾，不咥人，亨。',
        palace: '艮宫',
        wuxing: '土',
        shi: 5,
        ying: 2,
        liuqin: ['父母', '父母', '父母', '父母', '父母', '兄弟'],
        dizhi: ['巳', '卯', '丑', '午', '申', '戌'],
        wuxingYao: ['火', '木', '土', '火', '金', '土']
    },
    '110011': { 
        name: '风泽中孚', 
        info: '中孚：豚鱼吉，利涉大川，利贞。',
        palace: '艮宫',
        wuxing: '土',
        shi: 4,
        ying: 1,
        liuqin: ['父母', '父母', '父母', '父母', '兄弟', '官鬼'],
        dizhi: ['巳', '卯', '丑', '未', '巳', '卯'],
        wuxingYao: ['火', '木', '土', '土', '火', '木']
    },
    '001011': { 
        name: '风山渐', 
        info: '渐：女归吉，利贞。',
        palace: '艮宫',
        wuxing: '土',
        shi: 3,
        ying: 6,
        liuqin: ['父母', '父母', '父母', '兄弟', '子孙', '官鬼'],
        dizhi: ['辰', '午', '申', '未', '巳', '卯'],
        wuxingYao: ['土', '火', '金', '土', '火', '木']
    },
    
    // 坤宫八卦
    '000000': { 
        name: '坤为地', 
        info: '坤：元，亨，利牝马之贞。',
        palace: '坤宫',
        wuxing: '土',
        shi: 6,
        ying: 3,
        liuqin: ['兄弟', '父母', '官鬼', '兄弟', '妻财', '子孙'],
        dizhi: ['未', '巳', '卯', '丑', '亥', '酉'],
        wuxingYao: ['土', '火', '木', '土', '水', '金']
    },
    '100000': { 
        name: '地雷复', 
        info: '复：亨。出入无疾，朋来无咎。',
        palace: '坤宫',
        wuxing: '土',
        shi: 1,
        ying: 4,
        liuqin: ['妻财', '官鬼', '兄弟', '兄弟', '妻财', '子孙'],
        dizhi: ['子', '寅', '辰', '丑', '亥', '酉'],
        wuxingYao: ['水', '木', '土', '土', '水', '金']
    },
    '110000': { 
        name: '地泽临', 
        info: '临：元，亨，利，贞。至于八月有凶。',
        palace: '坤宫',
        wuxing: '土',
        shi: 2,
        ying: 5,
        liuqin: ['父母', '官鬼', '兄弟', '兄弟', '妻财', '子孙'],
        dizhi: ['巳', '卯', '丑', '丑', '亥', '酉'],
        wuxingYao: ['火', '木', '土', '土', '水', '金']
    },
    '111000': { 
        name: '地天泰', 
        info: '泰：小往大来，吉亨。',
        palace: '坤宫',
        wuxing: '土',
        shi: 3,
        ying: 6,
        liuqin: ['妻财', '官鬼', '兄弟', '兄弟', '妻财', '子孙'],
        dizhi: ['子', '寅', '辰', '丑', '亥', '酉'],
        wuxingYao: ['水', '木', '土', '土', '水', '金']
    },
    '111100': { 
        name: '雷天大壮', 
        info: '大壮：利贞。',
        palace: '坤宫',
        wuxing: '土',
        shi: 4,
        ying: 1,
        liuqin: ['妻财', '官鬼', '兄弟', '父母', '子孙', '兄弟'],
        dizhi: ['子', '寅', '辰', '午', '申', '戌'],
        wuxingYao: ['水', '木', '土', '火', '金', '土']
    },
    '111110': { 
        name: '泽天夬', 
        info: '夬：扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。',
        palace: '坤宫',
        wuxing: '土',
        shi: 5,
        ying: 2,
        liuqin: ['妻财', '官鬼', '兄弟', '妻财', '子孙', '兄弟'],
        dizhi: ['子', '寅', '辰', '亥', '酉', '未'],
        wuxingYao: ['水', '木', '土', '水', '金', '土']
    },
    '111010': { 
        name: '水天需', 
        info: '需：有孚，光亨，贞吉。利涉大川。',
        palace: '坤宫',
        wuxing: '土',
        shi: 4,
        ying: 1,
        liuqin: ['妻财', '官鬼', '兄弟', '子孙', '兄弟', '妻财'],
        dizhi: ['子', '寅', '辰', '申', '戌', '子'],
        wuxingYao: ['水', '木', '土', '金', '土', '水']
    },
    '000010': { 
        name: '水地比', 
        info: '比：吉。原筮元永贞，无咎。',
        palace: '坤宫',
        wuxing: '土',
        shi: 3,
        ying: 6,
        liuqin: ['兄弟', '父母', '官鬼', '子孙', '兄弟', '妻财'],
        dizhi: ['未', '巳', '卯', '申', '戌', '子'],
        wuxingYao: ['土', '火', '木', '金', '土', '水']
    },
};

// 全局状态
let currentStep = 0;
let yaos = []; // 存储6次抛掷的结果
let selectedQuestion = '';

// DOM元素
const questionSelect = document.getElementById('questionSelect');
const startBtn = document.getElementById('startBtn');
const questionSection = document.getElementById('questionSection');
const divinationSection = document.getElementById('divinationSection');
const guaDisplaySection = document.getElementById('guaDisplaySection');
const currentStepSpan = document.getElementById('currentStep');
const progressFill = document.getElementById('progressFill');
const throwBtn = document.getElementById('throwBtn');
const coinsDisplay = document.getElementById('coinsDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const throwResult = document.getElementById('throwResult');
const yaoSymbol = document.getElementById('yaoSymbol');
const yaoHistory = document.getElementById('yaoHistory');
const resetBtn = document.getElementById('resetBtn');

// 初始化
questionSelect.addEventListener('change', function() {
    startBtn.disabled = !this.value;
    selectedQuestion = this.options[this.selectedIndex].text;
});

startBtn.addEventListener('click', startDivination);
throwBtn.addEventListener('click', throwCoins);
resetBtn.addEventListener('click', reset);

// 开始算卦
function startDivination() {
    currentStep = 0;
    yaos = [];
    questionSection.style.display = 'none';
    divinationSection.style.display = 'block';
    guaDisplaySection.style.display = 'none';
    updateProgress();
    yaoHistory.innerHTML = '<h4>爻位记录（从下往上）</h4><div class="yao-list"></div>';
}

// 抛掷铜钱
function throwCoins() {
    if (currentStep >= 6) return;
    
    throwBtn.disabled = true;
    
    // 动画效果
    const coins = coinsDisplay.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.classList.add('flipping');
    });
    
    setTimeout(() => {
        // 随机生成3枚铜钱的结果（0=字，1=背）
        const coin1 = Math.floor(Math.random() * 2);
        const coin2 = Math.floor(Math.random() * 2);
        const coin3 = Math.floor(Math.random() * 2);
        
        const backs = coin1 + coin2 + coin3; // 背的数量
        
        // 显示铜钱结果
        coins[0].textContent = coin1 === 1 ? '背' : '字';
        coins[1].textContent = coin2 === 1 ? '背' : '字';
        coins[2].textContent = coin3 === 1 ? '背' : '字';
        coins.forEach(coin => {
            coin.classList.remove('flipping');
            coin.classList.add('show-result');
        });
        
        // 判断爻的类型
        let yaoType, yaoSymbolText, yaoDescription;
        
        if (backs === 1) {
            // 1背为单，点一点，表示阳（不动）
            yaoType = { value: 1, isMoving: false, movingType: null };
            yaoSymbolText = '⚊';
            yaoDescription = '单（一背两字）- 阳爻';
        } else if (backs === 2) {
            // 2背为拆，点两点，表示阴（不动）
            yaoType = { value: 0, isMoving: false, movingType: null };
            yaoSymbolText = '⚋';
            yaoDescription = '拆（两背一字）- 阴爻';
        } else if (backs === 3) {
            // 3背为重，画一圈，表示阳动
            yaoType = { value: 1, isMoving: true, movingType: 'yang' };
            yaoSymbolText = '○';
            yaoDescription = '重（三背）- 阳动';
        } else {
            // 3字为交，打一叉，表示阴动
            yaoType = { value: 0, isMoving: true, movingType: 'yin' };
            yaoSymbolText = '×';
            yaoDescription = '交（三字）- 阴动';
        }
        
        // 显示结果
        resultDisplay.style.display = 'block';
        throwResult.textContent = `结果：${coin1 === 1 ? '背' : '字'} ${coin2 === 1 ? '背' : '字'} ${coin3 === 1 ? '背' : '字'} - ${yaoDescription}`;
        yaoSymbol.textContent = yaoSymbolText;
        
        // 保存爻位
        yaos.push(yaoType);
        
        // 更新历史记录
        updateYaoHistory();
        
        currentStep++;
        updateProgress();
        
        // 如果完成6次抛掷，显示卦象
        if (currentStep >= 6) {
            setTimeout(() => {
                showGuaResult();
            }, 2000);
        } else {
            setTimeout(() => {
                throwBtn.disabled = false;
                resultDisplay.style.display = 'none';
                coins.forEach(coin => {
                    coin.classList.remove('show-result');
                    coin.textContent = '';
                });
            }, 1500);
        }
    }, 600);
}

// 更新进度
function updateProgress() {
    currentStepSpan.textContent = currentStep + 1;
    progressFill.style.width = ((currentStep + 1) / 6 * 100) + '%';
}

// 更新爻位历史记录
function updateYaoHistory() {
    const yaoList = yaoHistory.querySelector('.yao-list');
    const yaoItem = document.createElement('div');
    yaoItem.className = 'yao-item';
    
    const yao = yaos[yaos.length - 1];
    let symbol = '';
    let desc = '';
    
    if (yao.isMoving) {
        if (yao.movingType === 'yang') {
            symbol = '○';
            desc = '阳动';
        } else {
            symbol = '×';
            desc = '阴动';
        }
    } else {
        symbol = yao.value === 1 ? '⚊' : '⚋';
        desc = yao.value === 1 ? '阳爻' : '阴爻';
    }
    
    yaoItem.textContent = `第${yaos.length}爻（${6 - yaos.length + 1}位）：${symbol} ${desc}`;
    yaoList.insertBefore(yaoItem, yaoList.firstChild);
}

// 显示卦象结果
function showGuaResult() {
    divinationSection.style.display = 'none';
    guaDisplaySection.style.display = 'block';
    
    // 设置问题
    document.getElementById('selectedQuestion').textContent = selectedQuestion;
    
    // 生成初始卦（yaos[0]是初爻，yaos[5]是上爻）
    // 卦码格式：下卦（初二三爻）+ 上卦（四五六爻）
    let initialGuaCode = '';
    // 先拼接下卦（初二三爻）
    for (let i = 0; i <= 2; i++) {
        initialGuaCode += yaos[i].value.toString();
    }
    // 再拼接上卦（四五六爻）
    for (let i = 3; i <= 5; i++) {
        initialGuaCode += yaos[i].value.toString();
    }
    
    // 生成新卦（变卦）
    // 根据增删卜易规则：阳动变阴，阴动变阳，不动爻保持不变
    let newGuaCode = '';
    let movingYaoPositions = []; // 记录动爻位置
    // 先拼接下卦（初二三爻）
    for (let i = 0; i <= 2; i++) {
        if (yaos[i].isMoving) {
            newGuaCode += (yaos[i].value === 1 ? '0' : '1');
            movingYaoPositions.push(i + 1);
        } else {
            newGuaCode += yaos[i].value.toString();
        }
    }
    // 再拼接上卦（四五六爻）
    for (let i = 3; i <= 5; i++) {
        if (yaos[i].isMoving) {
            newGuaCode += (yaos[i].value === 1 ? '0' : '1');
            movingYaoPositions.push(i + 1);
        } else {
            newGuaCode += yaos[i].value.toString();
        }
    }
    
    // 显示初始卦
    displayGua('initialGua', initialGuaCode, yaos);
    let initialGuaInfo = guaData[initialGuaCode] || { name: '未知卦', info: `卦象信息待补充（卦码：${initialGuaCode}）`, palace: '未知宫' };
    // 使用增删卜易标准配置修正卦象信息
    initialGuaInfo = getCorrectGuaInfo(initialGuaCode, initialGuaInfo);
    document.getElementById('initialGuaName').textContent = initialGuaInfo.name;
    document.getElementById('initialGuaInfo').textContent = initialGuaInfo.info;
    
    // 显示初始卦的详细信息（六亲、五行、地支、世/应爻）
    displayGuaDetails('initialGuaDetails', initialGuaCode, initialGuaInfo, yaos);
    
    // 显示新卦
    displayGua('newGua', newGuaCode, yaos, true);
    let newGuaInfo = guaData[newGuaCode] || { name: '未知卦', info: `卦象信息待补充（卦码：${newGuaCode}）`, palace: '未知宫' };
    // 使用增删卜易标准配置修正卦象信息
    newGuaInfo = getCorrectGuaInfo(newGuaCode, newGuaInfo);
    document.getElementById('newGuaName').textContent = newGuaInfo.name;
    document.getElementById('newGuaInfo').textContent = newGuaInfo.info;
    
    // 显示新卦的详细信息
    displayGuaDetails('newGuaDetails', newGuaCode, newGuaInfo, yaos, true);
    
    // 调试信息（可在控制台查看）
    console.log('=== 卦象生成详情 ===');
    console.log('初始卦码:', initialGuaCode, '→', initialGuaInfo.name);
    console.log('新卦码:', newGuaCode, '→', newGuaInfo.name);
    console.log('动爻位置:', movingYaoPositions.length > 0 ? `第${movingYaoPositions.join('、')}爻` : '无动爻');
    console.log('各爻详情:');
    for (let i = 0; i < yaos.length; i++) {
        const yaoName = ['初', '二', '三', '四', '五', '上'][i] + '爻';
        const yaoType = yaos[i].value === 1 ? '阳' : '阴';
        const isMoving = yaos[i].isMoving ? '（动）' : '';
        const newValue = yaos[i].isMoving ? (yaos[i].value === 1 ? '阴' : '阳') : yaoType;
        console.log(`  ${yaoName}: ${yaoType}${isMoving} → 新卦: ${newValue}`);
    }
}

// 显示卦象图形
function displayGua(elementId, guaCode, yaos, isNewGua = false) {
    const guaDiagram = document.getElementById(elementId);
    guaDiagram.innerHTML = '';
    
    // 从下往上显示6个爻位（初爻在最下面，上爻在最上面）
    // guaCode格式：第0位是初爻，第5位是上爻
    // 显示时：先显示上爻（i=5），最后显示初爻（i=0）
    for (let i = 5; i >= 0; i--) {
        const yaoDiv = document.createElement('div');
        yaoDiv.className = 'yao-line';
        yaoDiv.style.height = '40px';
        yaoDiv.style.display = 'flex';
        yaoDiv.style.alignItems = 'center';
        yaoDiv.style.justifyContent = 'center';
        yaoDiv.style.marginBottom = '8px';
        
        // guaCode[i]对应的是第i位爻（0=初爻，5=上爻）
        const yaoIndex = i; // guaCode的索引直接对应yaos的索引
        const yao = yaos[yaoIndex];
        const isMoving = yao && yao.isMoving;
        
        if (!isNewGua) {
            // 初始卦：根据yaos[i].value显示，动爻用特殊符号
            if (yao.value === 1) {
                // 阳爻
                if (isMoving) {
                    // 阳动，显示为○
                    yaoDiv.innerHTML = '○';
                    yaoDiv.style.color = '#ff6b6b';
                    yaoDiv.style.fontWeight = 'bold';
                    yaoDiv.style.fontSize = '2em';
                } else {
                    yaoDiv.innerHTML = '⚊';
                    yaoDiv.style.fontSize = '2em';
                }
            } else {
                // 阴爻
                if (isMoving) {
                    // 阴动，显示为×
                    yaoDiv.innerHTML = '×';
                    yaoDiv.style.color = '#ff6b6b';
                    yaoDiv.style.fontWeight = 'bold';
                    yaoDiv.style.fontSize = '2em';
                } else {
                    yaoDiv.innerHTML = '⚋';
                    yaoDiv.style.fontSize = '2em';
                }
            }
        } else {
            // 新卦：根据guaCode显示，动爻位置用红色标记
            if (guaCode[i] === '1') {
                // 阳爻
                yaoDiv.innerHTML = '⚊';
                yaoDiv.style.fontSize = '2em';
                if (isMoving) {
                    yaoDiv.style.color = '#ff6b6b';
                    yaoDiv.style.fontWeight = 'bold';
                }
            } else {
                // 阴爻
                yaoDiv.innerHTML = '⚋';
                yaoDiv.style.fontSize = '2em';
                if (isMoving) {
                    yaoDiv.style.color = '#ff6b6b';
                    yaoDiv.style.fontWeight = 'bold';
                }
            }
        }
        
        guaDiagram.appendChild(yaoDiv);
    }
}

// 显示卦象详细信息（六亲+地支+五行+世/应）
function displayGuaDetails(elementId, guaCode, guaInfo, yaos, isNewGua = false) {
    const detailsDiv = document.getElementById(elementId);
    if (!detailsDiv) return;
    
    detailsDiv.innerHTML = '';
    
    // 确保有基本信息可显示
    if (!guaInfo || !guaInfo.dizhi || !guaInfo.wuxingYao) {
        detailsDiv.innerHTML = '<div class="yao-details"><div class="yao-details-list">卦象信息不完整</div></div>';
        return;
    }
    
    // 计算六亲关系
    let liuqinArray = [];
    if (guaInfo.liuqin && Array.isArray(guaInfo.liuqin)) {
        // 如果已有六亲数组，直接使用
        liuqinArray = guaInfo.liuqin;
    } else if (guaInfo.wuxing && guaInfo.wuxingYao) {
        // 否则自动计算六亲关系
        liuqinArray = calculateAllLiuqin(guaInfo.wuxing, guaInfo.wuxingYao);
    } else {
        // 使用默认值
        liuqinArray = ['', '', '', '', '', ''];
    }
    
    // 按爻位显示详细信息（从下往上：初爻到上爻）
    // 格式：六亲+地支+五行+世/应
    const yaoDetails = document.createElement('div');
    yaoDetails.className = 'yao-details';
    yaoDetails.innerHTML = '<div class="yao-details-list"></div>';
    const yaoList = yaoDetails.querySelector('.yao-details-list');
    
    // 从下往上显示（初爻到上爻），但在列表中从上往下排列
    const yaoNames = ['初', '二', '三', '四', '五', '上'];
    for (let i = 5; i >= 0; i--) {
        const yaoItem = document.createElement('div');
        yaoItem.className = 'yao-detail-item';
        yaoItem.style.padding = '4px 8px';
        yaoItem.style.marginBottom = '2px';
        yaoItem.style.backgroundColor = '#f8f9fa';
        yaoItem.style.borderRadius = '4px';
        yaoItem.style.fontSize = '14px';
        yaoItem.style.fontFamily = 'monospace';
        
        const yaoIndex = 5 - i; // 转换为从下往上的索引（0=初爻，5=上爻）
        const liuqin = liuqinArray[yaoIndex] || '';
        const dizhi = guaInfo.dizhi[yaoIndex] || '';
        const wuxing = guaInfo.wuxingYao[yaoIndex] || '';
        const isShi = (guaInfo.shi - 1) === yaoIndex ? ' —— 世' : '';
        const isYing = (guaInfo.ying - 1) === yaoIndex ? ' —— 应' : '';
        const yaoPosition = yaoNames[yaoIndex] + '爻';
        
        // 格式：爻位：六亲+地支+五行+世/应
        yaoItem.textContent = `${yaoPosition}：${liuqin}${dizhi}${wuxing}${isShi}${isYing}`;
        
        // 如果是世爻或应爻，加粗显示
        if (isShi || isYing) {
            yaoItem.style.fontWeight = 'bold';
            yaoItem.style.color = '#667eea';
            yaoItem.style.backgroundColor = '#e3f2fd';
        }
        
        yaoList.appendChild(yaoItem);
    }
    detailsDiv.appendChild(yaoDetails);
}

// 重置
function reset() {
    currentStep = 0;
    yaos = [];
    questionSection.style.display = 'block';
    divinationSection.style.display = 'none';
    guaDisplaySection.style.display = 'none';
    questionSelect.value = '';
    startBtn.disabled = true;
    resultDisplay.style.display = 'none';
    coinsDisplay.querySelectorAll('.coin').forEach(coin => {
        coin.classList.remove('show-result');
        coin.textContent = '';
    });
}

